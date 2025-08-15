import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { addGuest, deleteGuest, getAllGuests } from "~/.server/actions";
import { H2 } from "~/components/typography";
import { AddGuestForm, GuestListItem } from "~/components/ui";
import { useOptimisticGuest } from "~/hooks";

export const addGuestActionIntent = "add-guest";
export const deleteGuestActionIntent = "delete-guest";

export const meta: MetaFunction = () => {
  return [
    { title: "Optimistic UI - Remix" },
    { name: "description", content: "Using optimistic ui in Remix!" },
  ];
};

export async function loader() {
  const guests = await getAllGuests();
  return guests;
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

export default function Index() {
  const guests = useOptimisticGuest();

  return (
    <main className="px-4 py-12">
      <div className="mx-auto grid w-full max-w-2xl gap-12 md:grid-cols-2">
        <section className="space-y-6">
          <H2>Add New Guest</H2>
          <AddGuestForm />
        </section>
        <section className="space-y-6">
          <H2>Guest List</H2>
          {guests?.length === 0 ? (
            <p className="italic">There are currently no guests</p>
          ) : (
            <ul className="space-y-2">
              {guests?.map((guest) => (
                <GuestListItem key={guest.id} guest={guest} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
