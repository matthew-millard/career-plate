// For demonstration purposes!

import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui";

export default function DeleteCommentButton({ commentId }) {
  const fetcher = useFetcher();
  fetcher.state; // "idle" | "submitting" | "loading"
  fetcher.data; // returned data from our action
  fetcher.formData;
  fetcher.formAction;
  fetcher.formEncType;
  fetcher.formMethod;

  return (
    <fetcher.Form method="POST">
      <input type="hidden" name="id" value={commentId} />
      <Button type="submit">Delete Comment</Button>
    </fetcher.Form>
  );
}
