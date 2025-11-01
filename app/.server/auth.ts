import prisma from "~/lib/prisma";
import { getSession, SESSION_KEY, sessionStorage } from "./session";
import { redirect } from "@remix-run/node";
import { combineResponseInits } from "./utils";
import bcrypt from "bcryptjs";

// Cookie Expiration Time
const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

export function getSessionExpirationDate() {
  const expirationDate = new Date(Date.now() + SESSION_EXPIRATION_TIME);
  return expirationDate;
}

export async function getUserId(request: Request) {
  const cookieSession = await getSession(request);
  const sessionId = cookieSession.get(SESSION_KEY);

  if (!sessionId) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    select: { userId: true },
  });

  if (!session) {
    throw await logout({ request });
  }

  return session.userId;
}

export async function requireUserId(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  const userId = await getUserId(request);

  if (!userId) {
    const { pathname, search } = new URL(request.url);

    redirectTo =
      redirectTo === null ? null : (redirectTo ?? `${pathname}${search}`);

    const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null;
    const loginRedirect = ["/login", loginParams?.toString()]
      .filter(Boolean)
      .join("?");

    throw redirect(loginRedirect);
  }

  return userId;
}

export async function requireAnonymous(request: Request) {
  const userId = await getUserId(request);

  if (userId) {
    throw redirect("/", { status: 303 });
  }
}

interface Signup {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  password: string;
}

export async function signup({
  firstName,
  lastName,
  email,
  country,
  city,
  password,
}: Signup) {
  const passwordHash = await getPasswordHash(password);
  const session = await prisma.session.create({
    data: {
      expirationDate: getSessionExpirationDate(),
      user: {
        create: {
          email,
          password: {
            create: {
              hash: passwordHash,
            },
          },
          profile: {
            create: {
              firstName,
              lastName,
              country,
              city,
            },
          },
        },
      },
    },
    select: {
      id: true,
      userId: true,
    },
  });

  return session;
}

export async function logout(
  { request, redirectTo = "/" }: { request: Request; redirectTo?: string },
  responseInit?: ResponseInit,
) {
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  const sessionId = cookieSession.get(SESSION_KEY);

  void prisma.session
    .delete({
      where: {
        id: sessionId,
      },
    })
    .catch(() => {});

  throw redirect(
    redirectTo, // TODO: safeRedirect(redirectTo)
    combineResponseInits(responseInit, {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(cookieSession),
      },
    }),
  );
}

export async function getPasswordHash(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}
