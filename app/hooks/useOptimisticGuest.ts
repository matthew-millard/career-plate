import { useFetchers, useRouteLoaderData } from "@remix-run/react";
import { ADD_GUEST_FETCHER_KEY } from "~/components/ui/AddGuestForm";
import { Guest } from "~/generated/prisma/client";
import { loader } from "~/routes/_index";

export default function useOptimisticGuest() {
  const entries = useRouteLoaderData<typeof loader>("routes/_index");
  const fetchers = useFetchers();

  const optimisticEntries = fetchers.reduce<Guest[]>((memo, fetcher) => {
    if (fetcher.key === ADD_GUEST_FETCHER_KEY && fetcher.formData) {
      const data = Object.fromEntries(fetcher.formData);

      if (!entries?.map((entry) => entry.id).includes(String(data.id))) {
        memo.push({
          id: String(data.id),
          firstName: String(data.firstName),
          lastName: String(data.lastName),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    return memo;
  }, []);

  if (entries === undefined) {
    return optimisticEntries;
  }

  return [...entries, ...optimisticEntries];
}
