import { Link } from "@remix-run/react";
import { Button, Logo, ThemeToggle } from "~/components/ui";

export default function Header() {
  return (
    <div className="border-b">
      <header className="container flex h-20 max-w-7xl items-center justify-between">
        <Logo />
        <div className="flex">
          <Link to="/signup" prefetch="intent">
            <Button variant="link">Sign up</Button>
          </Link>
          <Link to="/login" prefetch="intent">
            <Button variant="link" className="text-foreground">
              Log in
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}
