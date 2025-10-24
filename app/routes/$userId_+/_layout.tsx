import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";
import { clsx } from "clsx";
import { useState } from "react";
import { getSession, SESSION_KEY, sessionStorage } from "~/.server/session";

import {
  AuthenticatedHeader,
  DesktopSidebar,
  MobileSidebar,
} from "~/components/layout";
import prisma from "~/lib/prisma";

export async function loader({ request, params }: LoaderFunctionArgs) {
  async function requireUserId(request: Request) {
    const session = await getSession(request);
    const sessionId = session.get(SESSION_KEY);

    if (!sessionId) {
      throw redirect("/login");
    }

    const _session = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        userId: true,
      },
    });

    if (!_session) {
      throw redirect("/login");
    }

    return _session.userId;
  }

  const userId = await requireUserId(request);

  if (params?.userId !== userId) {
    throw new Error("Invariance in userIds");
  }

  return {};
}

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
