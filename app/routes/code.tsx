export default function GuestListItem({ guest }: GuestListItemProps) {
  const fetcher = useFetcher<typeof action>();
  const isDeleting = fetcher.state !== "idle";
  const hasFailedDeletion = fetcher.data?.success === false;

  return (
    <li hidden={isDeleting}>
      <fetcher.Form method="POST">
        <span>
          {guest.firstName} {guest.lastName}
        </span>
        <input type="hidden" name="id" value={guest.id} />
        <Button type="submit">Delete Guest</Button>
      </fetcher.Form>
    </li>
  );
}
