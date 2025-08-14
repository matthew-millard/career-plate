import { Moon, Sun } from "lucide-react";
import Button from "./Button";
import { useFetcher } from "@remix-run/react";
import useTheme from "~/hooks/useTheme";

const THEME_FETCHER_KEY = "update-theme";

export default function ThemeSwitch() {
  const fetcher = useFetcher({ key: THEME_FETCHER_KEY });
  const usersPreference = useTheme();
  const nextMode = usersPreference === "light" ? "dark" : "light";
  return (
    <fetcher.Form method="POST" action="/">
      <input type="hidden" name="theme" value={nextMode} />
      <Button type="submit" size="icon" variant="outline">
        {usersPreference === "light" ? <Sun /> : <Moon />}
      </Button>
    </fetcher.Form>
  );
}
