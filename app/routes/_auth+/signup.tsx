import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { ActionFunctionArgs, data, redirect } from "@remix-run/node";
import { z } from "zod";
import { generateTOTP } from "@epic-web/totp";
import prisma from "~/lib/prisma";
import { SignupSchema } from "~/schemas";
import { getDomainUrl } from "~/.server/utils";
import {
  CODE_QUERY_PARAM,
  TARGET_QUERY_PARAM,
  TYPE_QUERY_PARAM,
} from "./verify";
import { sendEmail } from "~/.server/email";
import VerifyEmail from "~/emails/verify-email";
import { Form, useActionData } from "@remix-run/react";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import {
  Button,
  FieldErrors,
  FormErrors,
  HyperLink,
  Input,
  Label,
} from "~/components/ui";
import { HandMetal, LoaderCircle } from "lucide-react";
import { useIsPending } from "~/hooks";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // Validate payload
  const submission = await parseWithZod(formData, {
    async: true,
    schema: SignupSchema.transform(async (data, ctx) => {
      const emailExists = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (emailExists) {
        ctx.addIssue({
          code: "custom",
          path: ["email"],
          message: "Email is already in use",
        });

        return z.NEVER;
      }

      return data;
    }),
  });

  if (submission.status !== "success") {
    return data(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  const { email } = submission.value;

  const { algorithm, charSet, digits, otp, period, secret } =
    await generateTOTP({
      digits: 5,
      algorithm: "SHA-256",
      period: 15 * 60, // 15 mins
      charSet: "1234567890", // Removed I, O, and 0 to help prevent user confusion
    });

  const type = "sign-up";
  const redirectToUrl = new URL("/verify", getDomainUrl(request));

  redirectToUrl.searchParams.set(TYPE_QUERY_PARAM, type);
  redirectToUrl.searchParams.set(TARGET_QUERY_PARAM, email);

  const verifyUrl = new URL(redirectToUrl);
  verifyUrl.searchParams.set(CODE_QUERY_PARAM, otp); // Magic link

  const verificationData = {
    type,
    target: email,
    secret,
    algorithm,
    digits,
    period,
    charSet,
    expiresAt: new Date(Date.now() + period * 1000),
  };

  await prisma.verification.upsert({
    where: {
      target_type: {
        target: email,
        type,
      },
    },
    create: verificationData,
    update: verificationData,
  });

  const emailResponse = await sendEmail({
    from: "Notely <no-reply@notely.ca>",
    to: [email],
    subject: `${otp} is your code to confirm this email`,
    reactEmailTemplate: (
      <VerifyEmail otp={otp} verifyUrl={verifyUrl.toString()} />
    ),
  });

  if (emailResponse.init?.status !== 200) {
    return data(
      submission.reply({
        formErrors: ["Unknown server error. Please try again later."],
      }),
      { status: 500 },
    );
  }

  return redirect(redirectToUrl.toString());
}

export default function SignupRoute() {
  const isPending = useIsPending();
  const [form, fields] = useForm({
    id: "sign-up-form",
    lastResult: useActionData<typeof action>(),
    constraint: getZodConstraint(SignupSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupSchema });
    },
  });

  const { email } = fields;
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <Form
        method="POST"
        {...getFormProps(form)}
        className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-12 sm:px-6"
      >
        <div>
          <h2 className="text-2xl/9 font-bold tracking-tight">
            Get started with Career Plate
          </h2>
          <p className="mt-1 text-sm/6 text-foreground-muted">
            Enter your email to begin creating your profile. We&apos;ll send you
            a verification code to get started.
          </p>
        </div>

        <fieldset className="mt-6">
          <Label htmlFor={email.id}>Email</Label>
          <Input
            {...getInputProps(email, { type: "email" })}
            placeholder="name@example.com"
          />
          <FieldErrors field={email} />
        </fieldset>

        <Button type="submit" className="mt-3">
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <span className="flex items-center gap-1">
              Sign up <HandMetal />
            </span>
          )}
        </Button>
        <FormErrors errors={form.errors} />
        <p className="mt-6 text-center text-sm/6 text-foreground-muted">
          Already have a profile?{" "}
          <HyperLink to="/login">Log in to your account</HyperLink>
        </p>
      </Form>
      <div className="relative hidden lg:block">
        <img
          alt="background"
          src="/images/bento_grid_1_witek.jpg"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
}
