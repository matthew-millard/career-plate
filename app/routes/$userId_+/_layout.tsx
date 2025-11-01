import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { clsx } from "clsx";
import { useState } from "react";
import { requireUserId } from "~/.server/auth";

import {
  AuthenticatedHeader,
  DesktopSidebar,
  MobileSidebar,
} from "~/components/layout";
import prisma from "~/lib/prisma";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);

  const user = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });

  if (!user) {
    throw Error(`User with the id ${userId} not found`);
  }

  return { user };
}

export default function Layout() {
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
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
      <DesktopSidebar
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
