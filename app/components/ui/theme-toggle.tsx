import { Moon, Sun } from "lucide-react";
import { useFetcher } from "@remix-run/react";
import useTheme from "~/hooks/useTheme";

export const updateThemeActionIntent = "update-theme";
const THEME_FETCHER_KEY = "update-theme";

interface ThemeToggleProps extends React.HTMLAttributes<HTMLFormElement> {}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const fetcher = useFetcher({ key: THEME_FETCHER_KEY });
  const usersPreference = useTheme();
  const nextMode = usersPreference === "light" ? "dark" : "light";
  return (
    <fetcher.Form method="POST" action="/" className={`${className}`}>
      <input type="hidden" name="theme" value={nextMode} />
      <button
        type="submit"
        name="intent"
        value={updateThemeActionIntent}
        className="grid text-foreground-muted-extra"
      >
        {usersPreference === "light" ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )}
      </button>
    </fetcher.Form>
  );
}
