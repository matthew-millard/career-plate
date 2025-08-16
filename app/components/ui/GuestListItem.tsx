import { useFetcher } from "@remix-run/react";
import { type Guest } from "~/generated/prisma/client";
import { Trash, TriangleAlert } from "lucide-react";
import { Button } from "~/components/ui";
import { clsx } from "clsx";
import { action, deleteGuestActionIntent } from "~/routes/_index";

interface GuestListItemProps {
  guest: Guest;
}

export default function GuestListItem({ guest }: GuestListItemProps) {
  const fetcher = useFetcher<typeof action>();
  const isDeleting = fetcher.state !== "idle";
  const hasFailed = fetcher.data?.success === false;
  const errorMessage = hasFailed ? fetcher.data?.error?.message : null;

  return (
    <li
      hidden={isDeleting}
      className={clsx(
        "rounded-md border p-4 shadow-sm",
        hasFailed && "border-destructive",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">
          {guest.firstName} {guest.lastName}
        </span>
        <fetcher.Form method="POST">
          <input type="hidden" name="id" value={guest.id} />
          <Button
            name="intent"
            value={deleteGuestActionIntent}
            type="submit"
            variant={"destructive"}
            size={"icon"}
            aria-label={hasFailed ? "Retry" : "Delete"}
          >
            {hasFailed ? <TriangleAlert /> : <Trash />}
          </Button>
          {/* <p>{errorMessage}</p> */}
        </fetcher.Form>
      </div>
    </li>
  );
}
