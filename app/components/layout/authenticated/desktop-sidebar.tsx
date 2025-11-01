import { NavLink, useLoaderData } from "@remix-run/react";
import { clsx } from "clsx";
import {
  KeyRound,
  LayoutDashboard,
  Network,
  Settings,
  User,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Avatar } from "~/components/ui";
import { loader } from "~/routes/$userId_+/_layout";

interface DesktopSidebarProps extends React.HTMLAttributes<HTMLElement> {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

interface NavigationItem {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

export const navigation: NavigationItem[] = [
  { name: "Dashboard", icon: <LayoutDashboard />, slug: "dashboard" },
  { name: "Profile", icon: <User />, slug: "profile" },
  { name: "Network", icon: <Network />, slug: "network" },
  { name: "Security", icon: <KeyRound />, slug: "security" },
  { name: "Settings", icon: <Settings />, slug: "settings" },
] as const;

export default function DesktopSidebar({
  expanded,
  setExpanded,
  className,
  ...props
}: DesktopSidebarProps) {
  const { user } = useLoaderData<typeof loader>();
  return (
    <aside
      {...props}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={clsx(
        "fixed bottom-0 left-0 top-0 z-30 overflow-hidden border-r bg-card transition-all",
        expanded ? "w-64" : "w-16",
        className,
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="h-20 border-b"></div>
        <div className="flex-1">
          {navigation.map((item) => (
            <div key={item.name}>
              <NavLink
                to={`/${user.userId}/${item.slug}`}
                className={({ isActive }) =>
                  clsx(
                    "flex w-full gap-x-5 px-5 py-8",
                    isActive
                      ? "font-medium text-secondary"
                      : "font-normal text-foreground-muted-extra hover:text-foreground",
                  )
                }
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </div>
          ))}
        </div>
        <div
          className={clsx(
            "flex items-center gap-5 border-t p-5",
            expanded ? "justify-start" : "justify-center",
          )}
        >
          <Avatar
            className="flex-shrink-0"
            firstName={user.firstName}
            lastName={user.lastName}
            profileImageUrl={user.profileImageUrl}
          />

          {expanded && (
            <div className="font-medium">
              <p className="truncate text-sm text-foreground-muted">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-xs text-foreground-muted-extra">
                {user.currentPosition}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
