import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { ActionFunctionArgs, LoaderFunctionArgs, data } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Button, FieldErrors, FormErrors, Input, Label } from "~/components/ui";

import { SetupSchema } from "~/schemas";

import {
  Combobox,
  ComboboxButton,
  ComboboxContainer,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "~/components/ui/combobox";
import { verifySessionStorage } from "~/.server/verification";
import { TARGET_QUERY_PARAM } from "./verify";
import { signup } from "~/.server/auth";
import { getSession, SESSION_KEY } from "~/.server/session";
import { useIsPending } from "~/hooks";
import { LoaderCircle } from "lucide-react";

const countries = [
  { key: "argentina", value: "Argentina" },
  { key: "australia", value: "Australia" },
  { key: "brazil", value: "Brazil" },
  { key: "canada", value: "Canada" },
  { key: "china", value: "China" },
  { key: "france", value: "France" },
  { key: "germany", value: "Germany" },
  { key: "india", value: "India" },
  { key: "italy", value: "Italy" },
  { key: "japan", value: "Japan" },
  { key: "mexico", value: "Mexico" },
  { key: "netherlands", value: "Netherlands" },
  { key: "new-zealand", value: "New Zealand" },
  { key: "norway", value: "Norway" },
  { key: "singapore", value: "Singapore" },
  { key: "south-korea", value: "South Korea" },
  { key: "spain", value: "Spain" },
  { key: "sweden", value: "Sweden" },
  { key: "united-kingdom", value: "United Kingdom" },
  { key: "united-states", value: "United States Of America" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie");

  const verificationSession = await verifySessionStorage.getSession(cookie);
  const email = verificationSession.get(TARGET_QUERY_PARAM);

  if (typeof email !== "string" || !email) {
    throw redirect("/signup");
  }

  return { email };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: SetupSchema,
  });

  if (submission.status !== "success") {
    return data(
      submission.reply({
        formErrors: ["Not successful"],
        hideFields: ["password", "confirmPassword"],
      }),
      { status: submission.status === "error" ? 400 : 200 },
    );
  }

  const session = await signup(submission.value);

  if (!session) {
    return data(
      submission.reply({
        formErrors: ["User could not be created. Please try again"],
        hideFields: ["password"],
      }),
      { status: 500 },
    );
  }

  const cookieSession = await getSession(request);
  cookieSession.set(SESSION_KEY, session.id);

  return redirect(`/${session.userId}`);
}

export default function SetupRoute() {
  const isPending = useIsPending();
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const { email } = useLoaderData<typeof loader>();

  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((country) => {
          return country.value.toLowerCase().includes(query.toLowerCase());
        });

  const [form, fields] = useForm({
    id: "personal-info-form",
    constraint: getZodConstraint(SetupSchema),
    lastResult: useActionData<typeof action>(),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
    defaultValue: {
      email,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SetupSchema });
    },
  });

  return (
    <div className="flex min-h-dvh items-center p-4">
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-12 shadow-md">
        <h2 className="text-2xl/9 font-bold tracking-tight">
          Complete your account setup
        </h2>
        <p className="mt-1 text-sm/6 text-foreground-muted">
          Add your name, create a password, and tell us your country and city to
          personalize Career Plate.
        </p>

        <Form method="POST" {...getFormProps(form)} className="my-6 space-y-3">
          <input {...getInputProps(fields.email, { type: "hidden" })} />

          <div className="grid gap-x-6 sm:grid-cols-2">
            <div>
              <Label htmlFor={fields.firstName.id}>First name</Label>
              <Input
                {...getInputProps(fields.firstName, { type: "text" })}
                placeholder="Thomas"
              />
              <FieldErrors field={fields.firstName} />
            </div>
            <div>
              <Label htmlFor={fields.lastName.id}>Last name</Label>
              <Input
                {...getInputProps(fields.lastName, { type: "text" })}
                placeholder="Keller"
              />
              <FieldErrors field={fields.lastName} />
            </div>
          </div>

          <div className="grid gap-x-6 sm:grid-cols-2">
            <div>
              <Label htmlFor={fields.password.id}>Password</Label>
              <Input
                {...getInputProps(fields.password, { type: "password" })}
                autoComplete="new-password"
              />
              <FieldErrors field={fields.password} />
            </div>
            <div>
              <Label htmlFor={fields.confirmPassword.id}>
                Confirm password
              </Label>
              <Input
                {...getInputProps(fields.confirmPassword, { type: "password" })}
                autoComplete="new-password"
              />
              <FieldErrors field={fields.confirmPassword} />
            </div>
          </div>
          <div className="grid gap-x-6 sm:grid-cols-2">
            <Combobox
              as="div"
              value={selectedCountry}
              onClose={() => setQuery("")}
              onChange={(country) => {
                setQuery("");
                setSelectedCountry(country);
              }}
            >
              <ComboboxContainer>
                <Label htmlFor={fields.country.id}>Country</Label>
                <ComboboxInput
                  onChange={(e) => setQuery(e.target.value)}
                  onBlur={() => setQuery("")}
                  {...getInputProps(fields.country, { type: "text" })}
                />

                <ComboboxButton />
                <ComboboxOptions>
                  {filteredCountries.map((country) => (
                    <ComboboxOption key={country.key} value={country.value} />
                  ))}
                </ComboboxOptions>
              </ComboboxContainer>
              <FieldErrors field={fields.country} />
            </Combobox>

            <div>
              <Label htmlFor={fields.city.id}>City</Label>
              <Input {...getInputProps(fields.city, { type: "text" })} />
              <FieldErrors field={fields.city} />
            </div>
          </div>
        </Form>

        <Button type="submit" form={form.id} className="w-full">
          {isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </Button>
        <FormErrors errors={form.errors} />
      </div>
    </div>
  );
}
