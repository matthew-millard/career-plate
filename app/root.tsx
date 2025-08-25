import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Header } from "~/components/ui";
import {
  data,
  type ActionFunctionArgs,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import "./tailwind.css";
import { getThemeFromCookie, updateTheme } from "~/.server/theme";
import { useTheme } from "./hooks";
import { Toaster } from "sonner";
import useToast from "./hooks/useToast";
import { getToast, toastSessionStorage } from "./.server/toast";
import Banner, { hideBannerActionIntent } from "./components/ui/Banner";
import { updateThemeActionIntent } from "./components/ui/ThemeSwitch";
import { bannerCookie } from "./.server/banner";

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
  const { toast, toastCookieSession } = await getToast(request);
  const cookieHeaders = request.headers.get("Cookie");

  return data(
    { theme, toast, banner: await bannerCookie.parse(cookieHeaders) },
    {
      headers: {
        "Set-Cookie":
          await toastSessionStorage.commitSession(toastCookieSession),
      },
    },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case hideBannerActionIntent:
      return new Response(null, {
        status: 204,
        headers: {
          "Set-Cookie": await bannerCookie.serialize("hidden"),
        },
      });

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
  const data = useLoaderData<typeof loader>();
  const theme = useTheme();
  useToast(data?.toast);

  return (
    <html lang="en" className={`${theme} bg-background text-foreground`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Banner hidden={data.banner} />
        <Header theme={theme} />
        {children}
        <Toaster richColors expand />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
