import { Form, useSubmit } from "@remix-run/react";
import { useRef } from "react";
import { addGuestActionIntent } from "~/routes/_index";
import { Fieldset, Label, Input, Button } from "~/components/ui";

export const ADD_GUEST_FETCHER_KEY = "add-guest";

export default function AddGuestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const submit = useSubmit();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set("intent", addGuestActionIntent);
        formData.set("id", window.crypto.randomUUID());

        submit(formData, {
          navigate: false,
          // fetcherKey: ADD_GUEST_FETCHER_KEY,
          method: "POST",
        });

        formRef.current?.reset();
        firstNameInputRef.current?.focus();
      }}
      method="POST"
      ref={formRef}
      className="space-y-6"
    >
      <Fieldset className="space-y-2">
        <Label htmlFor="firstName" text="First name" />
        <Input
          id="firstName"
          name="firstName"
          type="text"
          ref={firstNameInputRef}
        />
      </Fieldset>
      <Fieldset className="space-y-2">
        <Label htmlFor="lastName" text="Last name" />
        <Input id="lastName" name="lastName" type="text" />
      </Fieldset>

      <Button type="submit" variant={"default"} size={"lg"} className="w-full">
        + Add Guest
      </Button>
    </Form>
  );
}
