import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { requireUserId } from "~/.server/auth";
import { getSession, sessionStorage } from "~/.server/session";

export async function loader() {
  throw redirect("/");
}

export async function action({ request }: ActionFunctionArgs) {
  await requireUserId(request);

  const session = await getSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });

  return {};
}
