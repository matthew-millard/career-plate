import { Dispatch, SetStateAction } from "react";
import { clsx } from "clsx";
import { Backdrop, Button } from "~/components/ui";
import { NavLink } from "@remix-run/react";
import { navigation } from "./desktop-sidebar";
import { X } from "lucide-react";

interface MobileSidebarProps extends React.HTMLAttributes<HTMLElement> {
  userId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileSidebar({
  userId,
  isOpen,
  setIsOpen,
  ...props
}: MobileSidebarProps) {
  return (
    <>
      <Backdrop isMobileMenuOpen={isOpen} setIsMobileMenuOpen={setIsOpen} />
      <aside
        className={clsx(
          isOpen ? "translate-x-0" : "-translate-x-full",
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-transform",
        )}
        {...props}
      >
        <div className="flex h-20 items-center justify-end border-b">
          <Button
            variant="ghost"
            size="icon"
            className="mr-3"
            onClick={() => setIsOpen(false)}
          >
            <span aria-label="Close menu" className="sr-only">
              Close menu
            </span>
            <X
              aria-hidden="true"
              className="size-6 text-foreground-muted-extra"
            />
          </Button>
        </div>
        <div className="mt-3 flex-1 space-y-3 border-b">
          {navigation.map((item) => (
            <div key={item.name}>
              <NavLink
                to={`/${userId}/${item.slug}`}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    "flex w-full gap-x-3 px-5 py-4",
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
        <div className="">Footer</div>
      </aside>
    </>
  );
}
