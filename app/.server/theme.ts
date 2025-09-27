import * as cookie from "cookie";
import { data } from "@remix-run/node";
import { COOKIE_PREFIX } from "./config";

type THEME = "light" | "dark";

const THEME_KEY = "prefers_theme";

export function getThemeFromCookie(request: Request) {
  const cookieHeader = request.headers.get("Cookie");

  if (!cookieHeader) return "light";

  const theme = cookie.parse(cookieHeader)[`${COOKIE_PREFIX}_${THEME_KEY}`];

  return theme === "light" || theme === "dark" ? theme : "light"; // default to light
}

export function updateTheme(formData: FormData) {
  const theme = String(formData.get("theme")) as THEME;
  const themeCookie = setThemeCookie(theme);

  return data(
    { success: true },
    {
      headers: {
        "Set-Cookie": themeCookie,
      },
    },
  );
}

function setThemeCookie(theme: THEME) {
  const themeCookie = cookie.serialize(`${COOKIE_PREFIX}_${THEME_KEY}`, theme, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });

  return themeCookie;
}
