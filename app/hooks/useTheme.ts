import { useFetchers, useRouteLoaderData } from "@remix-run/react";
import { loader } from "~/root";

export default function useTheme() {
  const data = useRouteLoaderData<typeof loader>("root");

  const fetchers = useFetchers();
  const themeFetcher = fetchers.find(
    (fetcher) => fetcher.key === "update-theme",
  );

  const optimisticTheme = themeFetcher?.formData?.get("theme");

  if (optimisticTheme === "light" || optimisticTheme === "dark") {
    return optimisticTheme;
  }

  return data?.theme;
}
