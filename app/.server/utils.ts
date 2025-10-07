export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

  if (!host) {
    throw new Error("Could not determine domain URL.");
  }

  const protocol = host.includes("localhost") ? "http" : "https";

  return `${protocol}://${host}`;
}

/**
 * Combine multiple header objects into one (uses append so headers are not overridden)
 */
export function combineHeaders(
  ...headers: Array<ResponseInit["headers"] | null>
) {
  const combined = new Headers();
  for (const header of headers) {
    if (!header) continue;
    for (const [key, value] of new Headers(header).entries()) {
      combined.append(key, value);
    }
  }
  return combined;
}

/**
 * Combine multiple response init objects into one (uses combineHeaders)
 */
export function combineResponseInits(
  ...responseInits: Array<ResponseInit | undefined>
) {
  let combined: ResponseInit = {};
  for (const responseInit of responseInits) {
    combined = {
      ...responseInit,
      headers: combineHeaders(combined.headers, responseInit?.headers),
    };
  }
  return combined;
}
