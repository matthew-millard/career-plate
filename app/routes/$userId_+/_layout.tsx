import { Outlet } from "@remix-run/react";
import { useState } from "react";

import { Avatar, MenuButton, SearchInput } from "~/components/ui";

export default function UserDashboardLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="container flex h-20 max-w-7xl items-center gap-x-4 lg:gap-x-6">
      <MenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-gray-700 lg:hidden" />

      <SearchInput placeholder="Search" />
      <Avatar firstName="Matt" lastName="Millard" profileImageUrl={""} />
    </header>
  );
}
