import { NavLink } from "@remix-run/react";
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

interface DesktopSidebarProps extends React.HTMLAttributes<HTMLElement> {
  userId: string;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

interface NavigationItem {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", icon: <LayoutDashboard />, slug: "dashboard" },
  { name: "Profile", icon: <User />, slug: "profile" },
  { name: "Network", icon: <Network />, slug: "network" },
  { name: "Security", icon: <KeyRound />, slug: "security" },
  { name: "Settings", icon: <Settings />, slug: "settings" },
] as const;

export default function DesktopSidebar({
  userId,
  expanded,
  setExpanded,
  className,
  ...props
}: DesktopSidebarProps) {
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
                to={`/${userId}/${item.slug}`}
                className={({ isActive }) =>
                  clsx(
                    "flex w-full gap-x-5 px-5 py-8",
                    isActive
                      ? "font-medium text-secondary"
                      : "font-normal text-foreground-muted-extra",
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
            firstName="Matthew"
            lastName="Millard"
            profileImageUrl=""
          />

          {expanded && (
            <div className="font-medium">
              <p className="truncate text-sm text-foreground-muted">
                Matt Millard
              </p>
              <p className="truncate text-xs text-foreground-muted-extra">
                Bar Manager
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
