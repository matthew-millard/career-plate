import { Button, Logo, ThemeToggle } from "~/components/ui";

export default function Header() {
  return (
    <div className="border-b">
      <header className="container flex h-20 max-w-7xl items-center justify-between">
        <Logo />
        <div className="flex">
          <Button variant="link">Sign up</Button>
          <Button variant="link" className="text-foreground">
            Log in
          </Button>
          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}
