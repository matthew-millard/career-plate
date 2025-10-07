import { createCookieSessionStorage } from "@remix-run/node";
import { COOKIE_PREFIX } from "./config";
import { ENV } from "./env";

export const SESSION_KEY = "sessionId";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: `${COOKIE_PREFIX}_${SESSION_KEY}`,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ENV.SESSION_SECRET.split(","),
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
