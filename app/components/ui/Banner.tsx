import { useFetcher } from "@remix-run/react";
import { clsx } from "clsx";
import { X } from "lucide-react";
import { Button } from "~/components/ui";

export const hideBannerActionIntent = "hide-banner";

interface BannerProps {
  isHidden: boolean;
}

export default function Banner({ isHidden }: BannerProps) {
  const fetcher = useFetcher();
  const hasDismissed = fetcher.state !== "idle";

  return (
    <div
      className={clsx(
        isHidden || hasDismissed
          ? "hidden"
          : "relative isolate flex items-center gap-x-6 overflow-hidden border-y bg-card px-6 py-2.5 sm:px-3.5 sm:before:flex-1",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6 text-card-foreground">
          <strong className="font-semibold">Remix Jam 2025</strong>
          <span className="px-2">·</span>Join us in Toronto on October 10th.
        </p>
        <a
          href="https://remix.run/jam/2025"
          target="_blank"
          rel="noreferrer"
          className="shadow-xs flex-none rounded-full bg-primary px-3.5 py-1 text-sm font-semibold text-primary-foreground"
        >
          Get tickets <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <fetcher.Form method="POST" className="flex flex-1 justify-end">
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          name="intent"
          value={hideBannerActionIntent}
          className="p-3 focus-visible:-outline-offset-4"
        >
          <span className="sr-only">Dismiss</span>
          <X aria-hidden="true" className="size-5 text-foreground" />
        </Button>
      </fetcher.Form>
    </div>
  );
}
