import { createCookie } from "@remix-run/node";

export const bannerCookie = createCookie("DEMO_prefs-banner", {
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24,
});
