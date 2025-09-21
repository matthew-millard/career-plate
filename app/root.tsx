import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  type LinksFunction,
} from "@remix-run/node";

import "./tailwind.css";
import { getThemeFromCookie, updateTheme } from "~/.server/theme";
import { useTheme } from "./hooks";
import { updateThemeActionIntent } from "./components/ui/theme-toggle";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const theme = getThemeFromCookie(request);
  return data({
    theme,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case updateThemeActionIntent:
      return updateTheme(formData);

    default:
      throw new Response("Invalid intent", {
        status: 400,
        statusText: "Invalid intent",
      });
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <html lang="en" className={`${theme} bg-background text-foreground`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
