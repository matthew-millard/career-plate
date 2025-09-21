import { Moon, Sun } from "lucide-react";
import { useFetcher } from "@remix-run/react";
import useTheme from "~/hooks/useTheme";
import { Button } from "~/components/ui";

export const updateThemeActionIntent = "update-theme";
const THEME_FETCHER_KEY = "update-theme";

export default function ThemeToggle() {
  const fetcher = useFetcher({ key: THEME_FETCHER_KEY });
  const usersPreference = useTheme();
  const nextMode = usersPreference === "light" ? "dark" : "light";
  return (
    <fetcher.Form method="POST" action="/" className="pl-4">
      <input type="hidden" name="theme" value={nextMode} />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        name="intent"
        value={updateThemeActionIntent}
      >
        {usersPreference === "light" ? <Sun /> : <Moon />}
      </Button>
    </fetcher.Form>
  );
}
