import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { action, addGuestActionIntent } from "~/routes/_index";
import { Fieldset, Label, Input, Button } from "~/components/ui";

export default function AddGuestForm() {
  const fetcher = useFetcher<typeof action>({ key: addGuestActionIntent });
  const formRef = useRef<HTMLFormElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  const isAdding = fetcher.state !== "idle";

  useEffect(() => {
    formRef.current?.reset();
    firstNameInputRef.current?.focus();
  }, [isAdding]);

  return (
    <fetcher.Form method="POST" ref={formRef} className="space-y-6">
      <Fieldset disabled={isAdding} className="space-y-2">
        <Label htmlFor="firstName" text="First name" />
        <Input
          id="firstName"
          name="firstName"
          type="text"
          ref={firstNameInputRef}
        />
      </Fieldset>
      <Fieldset disabled={isAdding} className="space-y-2">
        <Label htmlFor="lastName" text="Last name" />
        <Input id="lastName" name="lastName" type="text" />
      </Fieldset>

      <Button
        type="submit"
        name="intent"
        value={addGuestActionIntent}
        variant={"default"}
        size={"lg"}
        className="w-full"
        disabled={isAdding}
      >
        {isAdding ? "Adding..." : "+ Add Guest"}
      </Button>
    </fetcher.Form>
  );
}
