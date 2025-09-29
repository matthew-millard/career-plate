import { getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxContainer,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  FieldErrors,
  Input,
  Label,
} from "~/components/ui";
import { PersonalInfoSchema } from "~/schemas";

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
  return {};
}

export default function SetupRoute() {
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((country) => {
          return country.value.toLowerCase().includes(query.toLowerCase());
        });

  const [form, { firstName, lastName, email, country }] = useForm({
    id: "personal-info-form",
    constraint: getZodConstraint(PersonalInfoSchema),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
    defaultValue: {
      email: "matthew.richie.millard@gmail.com",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PersonalInfoSchema });
    },
  });

  return (
    <div className="min-h-dvh py-10 sm:py-20">
      <div className="container grid gap-4 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base/7 font-semibold">Personal Information</h2>
          <p className="text-sm/6 text-foreground-muted">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="md:col-span-2">
          <Form method="POST" className="rounded-xl border bg-card">
            <div className="max-w-3xl p-7">
              <div className="grid gap-x-4 md:grid-cols-2">
                <fieldset>
                  <Label htmlFor={firstName.id}>First name</Label>
                  <Input
                    {...getInputProps(firstName, { type: "text" })}
                    placeholder="Thomas"
                  />
                  <FieldErrors field={firstName} />
                </fieldset>
                <fieldset>
                  <Label htmlFor={lastName.id}>Last name</Label>
                  <Input
                    {...getInputProps(lastName, { type: "text" })}
                    placeholder="Keller"
                  />
                  <FieldErrors field={lastName} />
                </fieldset>
              </div>
              <div className="max-w-lg">
                <fieldset disabled>
                  <Label htmlFor={email.id}>Email</Label>
                  <Input
                    {...getInputProps(email, { type: "email" })}
                    readOnly
                  />
                  <FieldErrors field={email} />
                </fieldset>
              </div>
              <div className="grid gap-x-4 md:grid-cols-2">
                <Combobox>
                  <Label htmlFor={country.id}>Country</Label>
                  <ComboboxContainer>
                    <ComboboxInput setQuery={setQuery} />
                    <ComboboxButton />
                    <ComboboxOptions>
                      {filteredCountries.map((country) => (
                        <ComboboxOption
                          key={country.key}
                          value={country.value}
                        />
                      ))}
                    </ComboboxOptions>
                  </ComboboxContainer>
                  <FieldErrors field={country} />
                </Combobox>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
