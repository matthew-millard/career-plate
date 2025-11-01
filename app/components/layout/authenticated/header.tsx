import { Dispatch, SetStateAction } from "react";
import { clsx } from "clsx";
import {
  Avatar,
  MenuButton,
  SearchInput,
  ThemeToggle,
  ViewNotifications,
} from "~/components/ui";
import { useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/$userId_+/_layout";

interface AuthenticatedHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  expanded: boolean;
}

export default function AuthenticatedHeader({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  expanded,
}: AuthenticatedHeaderProps) {
  const { user } = useLoaderData<typeof loader>();
  return (
    <header
      className={clsx(
        "fixed top-0 z-20 flex h-20 items-center gap-x-4 border-b bg-background p-4 transition-all lg:gap-x-6 lg:px-8",
        expanded ? "left-64" : "left-0 lg:left-16",
        expanded ? "right-0" : "right-0",
      )}
    >
      <MenuButton
        className="lg:hidden"
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-subtle lg:hidden" />
      <SearchInput />
      {/* placeholder="Search hospitality professionals..." */}
      <ViewNotifications />
      <ThemeToggle className="hidden lg:block" />
      <Avatar
        firstName={user.firstName}
        lastName={user.lastName}
        profileImageUrl={user.profileImageUrl}
        className="lg:hidden"
      />
    </header>
  );
}
