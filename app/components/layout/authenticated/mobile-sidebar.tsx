import { Dispatch, SetStateAction } from "react";
import { clsx } from "clsx";
import { Backdrop } from "~/components/ui";

interface MobileSidebarProps extends React.HTMLAttributes<HTMLElement> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileSidebar({
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
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-card transition-transform",
        )}
        {...props}
      ></aside>
    </>
  );
}
