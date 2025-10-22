import { Outlet } from "@remix-run/react";
import { clsx } from "clsx";
import { useState } from "react";
import {
  AuthenticatedHeader,
  DesktopSidebar,
  MobileSidebar,
} from "~/components/layout";

export default function Layout() {
  const userId = "123456"; // Obvs get userId from loader function - cookie
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div>
      <AuthenticatedHeader
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        expanded={expanded}
      />
      <MobileSidebar
        userId={userId}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
      <DesktopSidebar
        userId={userId}
        expanded={expanded}
        setExpanded={setExpanded}
        className="hidden lg:block"
      />

      <main
        className={clsx(
          "pt-20 transition-all",
          expanded ? "lg:pl-64" : "lg:pl-16",
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
