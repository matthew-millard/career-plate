import { clsx } from "clsx";
import Backdrop from "./backdrop";
import { Dispatch, SetStateAction } from "react";

interface MobileMenuProps extends React.HTMLAttributes<HTMLElement> {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  ...props
}: MobileMenuProps) {
  return (
    <>
      <Backdrop
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <aside
        className={clsx(
          isMobileMenuOpen ? "w-64" : "w-0",
          "fixed inset-y-0 left-0 z-50 border-r bg-card transition-all",
        )}
        {...props}
      ></aside>
    </>
  );
}
