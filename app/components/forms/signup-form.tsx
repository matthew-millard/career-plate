import { Form } from "@remix-run/react";
import { Button, FieldErrors, HyperLink, Input, Label } from "~/components/ui";
import { SignupSchema } from "~/schemas";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { HandMetal } from "lucide-react";

export default function SignupForm() {
  const [form, fields] = useForm({
    id: "sign-up-form",
    constraint: getZodConstraint(SignupSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupSchema });
    },
  });

  const { firstName, lastName, email, password, confirmPassword, redirectTo } =
    fields;

  return (
    <Form
      method="POST"
      {...getFormProps(form)}
      className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-12 sm:px-6"
    >
      <div>
        <h2 className="text-2xl/9 font-bold tracking-tight">
          Create an account
        </h2>
        <p className="mt-1 text-sm/6 text-foreground-muted">
          Already a member?{" "}
          <HyperLink to="/login">Log in to your account</HyperLink>
        </p>
      </div>

      <fieldset className="mt-6">
        <Label htmlFor={firstName.id}>First name</Label>
        <Input
          {...getInputProps(firstName, { type: "text" })}
          type="text"
          placeholder="Thomas"
        />
        <FieldErrors field={firstName} />
      </fieldset>

      <fieldset className="mt-2">
        <Label htmlFor={lastName.id}>Last name</Label>
        <Input
          {...getInputProps(lastName, { type: "text" })}
          placeholder="Keller"
        />
        <FieldErrors field={lastName} />
      </fieldset>

      <fieldset className="mt-2">
        <Label htmlFor={email.id}>Email</Label>
        <Input
          {...getInputProps(email, { type: "email" })}
          placeholder="name@example.com"
        />
        <FieldErrors field={email} />
      </fieldset>

      <fieldset className="mt-2">
        <Label htmlFor={password.id}>Password</Label>
        <Input
          {...getInputProps(password, { type: "password" })}
          autoComplete="new-password"
        />
        <FieldErrors field={password} />
      </fieldset>

      <fieldset className="mt-2">
        <Label htmlFor={confirmPassword.id}>Confirm password</Label>
        <Input
          {...getInputProps(confirmPassword, { type: "password" })}
          autoComplete="new-password"
        />
        <FieldErrors field={confirmPassword} />
      </fieldset>

      <Button type="submit" className="mt-3">
        Sign up <HandMetal />
      </Button>
    </Form>
  );
}
