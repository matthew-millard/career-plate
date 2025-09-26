import { z } from "zod";

const FirstNameSchema = z
  .string({ error: "First name is required." })
  .trim()
  .min(1, { message: "First name is required." })
  .max(30, { message: "First name must be 30 characters or less." });

const LastNameSchema = z
  .string({ error: "Last name is required." })
  .trim()
  .min(1, { message: "Last name is required." })
  .max(30, { message: "Last name must be 30 characters or less." });

const EmailSchema = z
  .email({ message: "Email is invalid." })
  .min(3, { message: "Email is too short." })
  .max(100, { message: "Email is too long." })
  // users can type the email in any case, but we store it in lowercase
  .transform((value) => value.toLowerCase());

const PasswordSchema = z
  .string({ error: "Password is required." })
  .min(8, { message: "Password must be at least 8 characters long." })
  .max(124, { message: "Password must be at most 124 characters long." })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[\W_]/, {
    message: "Password must contain at least one special character.",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number." });

const RedirectToSchema = z.string().optional();

export const SignupSchema = z
  .object({
    firstName: FirstNameSchema,
    lastName: LastNameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: z.string({ error: "Passwords don't match" }),
    redirectTo: RedirectToSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // This will attach the error to the passwordConfirm field
  });

export const LoginSchema = z.object({
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string(),
  rememberMe: z.literal("on").optional(),
  redirectTo: RedirectToSchema,
});
