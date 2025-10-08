import { parseWithZod } from "@conform-to/zod/v4";
import { verifyTOTP } from "@epic-web/totp";
import { createCookieSessionStorage, data, redirect } from "@remix-run/node";
import { z } from "zod";
import {
  CODE_QUERY_PARAM,
  TARGET_QUERY_PARAM,
  TYPE_QUERY_PARAM,
  VerifySchema,
} from "~/routes/_auth+/verify";
import { COOKIE_PREFIX } from "./config";
import { ENV } from "./env";
import prisma from "~/lib/prisma";

interface Verification {
  code: string;
  type: "sign-up";
  target: string;
}

export const VERIFY_SESSION_KEY = "verification";

export const verifySessionStorage = createCookieSessionStorage({
  cookie: {
    name: `${COOKIE_PREFIX}_${VERIFY_SESSION_KEY}`,
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    secrets: ENV.SESSION_SECRET.split(","),
    secure: process.env.NODE_ENV === "production",
  },
});

export async function validateRequest(
  request: Request,
  body: URLSearchParams | FormData,
) {
  const submission = await parseWithZod(body, {
    async: true,
    schema: VerifySchema.transform(async (data, ctx) => {
      const isCodeValid = await validateCode({
        code: data[CODE_QUERY_PARAM],
        type: data[TYPE_QUERY_PARAM],
        target: data[TARGET_QUERY_PARAM],
      });

      if (!isCodeValid) {
        ctx.addIssue({
          code: "custom",
          path: [CODE_QUERY_PARAM],
          message: "Invalid code",
        });

        return z.NEVER;
      }
      return data;
    }),
  });

  if (submission.status !== "success") {
    return data(
      submission.reply({
        formErrors: ["Error"],
        hideFields: [CODE_QUERY_PARAM],
      }),
      {
        status: submission.status === "error" ? 400 : 200,
      },
    );
  }

  const { target, type } = submission.value;

  switch (type) {
    case "sign-up": {
      await deleteVerification({ target, type });
      return handleSignUpVerification({ request, target });
    }

    default:
      throw new Response("Invalid verification type", {
        status: 400,
        statusText: "Invalid type",
      });
  }
}

export async function validateCode({ code, type, target }: Verification) {
  const verification = await prisma.verification.findUnique({
    where: {
      target_type: { target, type },
    },
    select: {
      secret: true,
      period: true,
      digits: true,
      algorithm: true,
      charSet: true,
    },
  });

  if (!verification) {
    return false;
  }

  const result = await verifyTOTP({
    otp: code,
    ...verification,
  });

  if (!result) {
    return false;
  } else {
    return true;
  }
}

export async function deleteVerification({
  target,
  type,
}: Omit<Verification, "code">) {
  await prisma.verification.delete({
    where: {
      target_type: {
        target,
        type,
      },
    },
  });
}

export async function handleSignUpVerification({
  request,
  target,
}: {
  request: Request;
  target: string;
}) {
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie"),
  );
  verifySession.set(TARGET_QUERY_PARAM, target);

  return redirect("/setup", {
    headers: {
      "Set-Cookie": await verifySessionStorage.commitSession(verifySession),
    },
  });
}
