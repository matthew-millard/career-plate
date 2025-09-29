import { Form } from "@remix-run/react";
import { Button, FieldErrors, HyperLink, Input, Label } from "~/components/ui";
import { SignupSchema } from "~/schemas";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { HandMetal, LoaderCircle } from "lucide-react";
import { useIsPending } from "~/hooks";

export default function SignupForm() {
  const isPending = useIsPending();
  const [form, fields] = useForm({
    id: "sign-up-form",
    constraint: getZodConstraint(SignupSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupSchema });
    },
  });

  const { email } = fields;

  return (
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
          Enter your email to begin creating your profile. We&apos;ll send you a
          verification code to get started.
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
      {/* <fieldset className="mt-2">
        <Label htmlFor={password.id}>Password</Label>
        <Input
          {...getInputProps(password, { type: "password" })}
          autoComplete="new-password"
        />
        <FieldErrors field={password} />
      </fieldset> */}
      {/* <fieldset className="mt-2">
        <Label htmlFor={confirmPassword.id}>Confirm password</Label>
        <Input
          {...getInputProps(confirmPassword, { type: "password" })}
          autoComplete="new-password"
        />
        <FieldErrors field={confirmPassword} />
      </fieldset> */}
      <Button type="submit" className="mt-3">
        {isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <span className="flex items-center gap-1">
            Sign up <HandMetal />
          </span>
        )}
      </Button>
      <p className="mt-6 text-center text-sm/6 text-foreground-muted">
        Already have a profile?{" "}
        <HyperLink to="/login">Log in to your account</HyperLink>
      </p>
    </Form>
  );
}
