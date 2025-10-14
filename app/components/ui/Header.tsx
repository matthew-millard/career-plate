import { useState } from "react";
import { Link } from "@remix-run/react";
import { Menu, X } from "lucide-react";
import { Button, Logo, ThemeToggle } from "~/components/ui";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="border-b">
      <header className="container flex h-20 max-w-7xl items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-2">
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

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t lg:hidden">
          <div className="container max-w-7xl space-y-2 py-4">
            <Link
              to="/signup"
              prefetch="intent"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button variant="link" className="w-full justify-start">
                Sign up
              </Button>
            </Link>
            <Link
              to="/login"
              prefetch="intent"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button
                variant="link"
                className="w-full justify-start text-foreground"
              >
                Log in
              </Button>
            </Link>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
