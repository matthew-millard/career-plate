import * as cookie from "cookie";

const BANNER_KEY = "DEMO_prefers-banner";

export function hasDismissedBanner(request: Request): boolean {
  const cookieHeaders = request.headers.get("Cookie");

  if (!cookieHeaders) return false;

  return parseCookie(cookieHeaders)[BANNER_KEY] === "hidden";
}

function parseCookie(cookieHeaders: string) {
  return cookie.parse(cookieHeaders);
}

export function setBannerPreferenceInCookie() {
  return cookie.serialize(BANNER_KEY, "hidden", {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });
}
