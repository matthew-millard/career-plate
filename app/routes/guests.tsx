import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { addGuest, deleteGuest, getAllGuests } from "~/.server/actions";
import { H2 } from "~/components/typography";
import { Button, Fieldset, GuestListItem, Input, Label } from "~/components/ui";
import { deleteGuestActionIntent } from "~/components/ui/GuestListItem";

export const addGuestActionIntent = "add-guest";

export const meta: MetaFunction = () => {
  return [
    { title: "Optimistic UI - Remix" },
    { name: "description", content: "Using optimistic ui in Remix!" },
  ];
};

export async function loader() {
  const guests = await getAllGuests();
  return { guests };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case addGuestActionIntent:
      return await addGuest(formData);

    case deleteGuestActionIntent:
      return await deleteGuest(formData);

    default:
      throw new Response(`Invalid intent "${intent}"`, { status: 400 });
  }
}

export default function GuestsRoute() {
  const { guests } = useLoaderData<typeof loader>();
  const formRef = useRef<HTMLFormElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const addGuest = useFetcher<typeof action>();
  const isAdding = addGuest.state !== "idle";

  useEffect(() => {
    formRef.current?.reset();
    firstNameInputRef.current?.focus();
  }, [isAdding]);

  return (
    <main className="px-4 py-12 md:py-24">
      <div className="mx-auto grid w-full max-w-2xl gap-12 md:grid-cols-2">
        <section className="space-y-6">
          <H2>Add New Guest</H2>
          <addGuest.Form method="POST" ref={formRef} className="space-y-6">
            <Fieldset disabled={isAdding} className="space-y-2">
              <Label htmlFor="firstName" text="First name" />
              <Input
                id="firstName"
                name="firstName"
                type="text"
                ref={firstNameInputRef}
              />
              {/* <FieldError errors={null} /> */}
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
            >
              {isAdding ? "Adding..." : "+ Add Guest"}
            </Button>
          </addGuest.Form>
        </section>
        <section className="space-y-6">
          <H2>Guest List</H2>
          {guests.length > 0 ? (
            <ul className="space-y-2">
              {guests.map((guest) => (
                <GuestListItem key={guest.id} guest={guest} />
              ))}
            </ul>
          ) : (
            <p className="italic">There are currently no guests</p>
          )}
        </section>
      </div>
    </main>
  );
}
