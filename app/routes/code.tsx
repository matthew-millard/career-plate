// export default function GuestListItem({ guest }: GuestListItemProps) {
//   const fetcher = useFetcher();
//   const isDeleting = fetcher.state !== "idle";
//   const hasFailedDeletion = fetcher.data?.success === false;

//   return (
//     <li
//       hidden={isDeleting}
//       className={clsx(hasFailedDeletion && "border-destructive")}
//     >
//       <span className="font-medium">
//         {guest.firstName} {guest.lastName}
//       </span>
//       <fetcher.Form method="POST">
//         <input type="hidden" name="id" value={guest.id} />
//         <Button type="submit">
//           {hasFailedDeletion ? "Retry" : "Delete Guest"}
//         </Button>
//       </fetcher.Form>
//     </li>
//   );
// }
