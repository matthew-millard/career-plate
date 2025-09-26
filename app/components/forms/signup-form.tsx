import { Form } from "@remix-run/react";
import { Button, HyperLink, Input, Label } from "~/components/ui";
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
      className="mx-auto flex w-full max-w-md flex-col justify-center space-y-6 px-4 py-12 sm:px-6"
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

      <fieldset>
        <Label htmlFor={firstName.id}>First name</Label>
        <Input
          {...getInputProps(firstName, { type: "text" })}
          type="text"
          placeholder="Thomas"
          className="mt-1"
        />
      </fieldset>

      <fieldset>
        <Label htmlFor={lastName.id}>Last name</Label>
        <Input
          {...getInputProps(lastName, { type: "text" })}
          placeholder="Keller"
          className="mt-1"
        />
      </fieldset>

      <fieldset>
        <Label htmlFor={email.id}>Email</Label>
        <Input
          {...getInputProps(email, { type: "email" })}
          placeholder="name@example.com"
          className="mt-1"
        />
      </fieldset>
      <fieldset>
        <Label htmlFor={password.id}>Password</Label>
        <Input
          {...getInputProps(password, { type: "password" })}
          autoComplete="new-password"
          className="mt-1"
        />
      </fieldset>
      <fieldset>
        <Label htmlFor={confirmPassword.id}>Confirm password</Label>
        <Input
          {...getInputProps(confirmPassword, { type: "password" })}
          autoComplete="new-password"
          className="mt-1"
        />
      </fieldset>

      <Button type="submit" className="w-full">
        Sign up <HandMetal />
      </Button>
    </Form>
  );
}
