import { useFetcher } from "@remix-run/react";
import { type Guest } from "~/generated/prisma/client";
import { RefreshCw, X } from "lucide-react";
import { Button } from "~/components/ui";
import { clsx } from "clsx";
import { action } from "~/routes/_index";

export const deleteGuestActionIntent = "delete-guest";

interface GuestListItemProps {
  guest: Guest;
}

export default function GuestListItem({ guest }: GuestListItemProps) {
  const fetcher = useFetcher<typeof action>();
  const isDeleting = fetcher.state !== "idle";
  const hasFailedDeletion = fetcher.data?.success === false;

  return (
    <li
      hidden={isDeleting}
      className={clsx(
        "rounded-md border p-4 shadow-sm",
        hasFailedDeletion && "border-destructive",
      )}
    >
      <fetcher.Form method="POST" className="flex items-center justify-between">
        <input type="hidden" name="id" value={guest.id} />
        <span className="font-medium">
          {guest.firstName} {guest.lastName}
        </span>
        <Button
          name="intent"
          value={deleteGuestActionIntent}
          type="submit"
          variant={"destructive"}
          size={"icon"}
          aria-label={hasFailedDeletion ? "Retry" : "Delete"}
        >
          {hasFailedDeletion ? <RefreshCw /> : <X />}
        </Button>
      </fetcher.Form>
    </li>
  );
}
