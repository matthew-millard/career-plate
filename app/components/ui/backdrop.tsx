import { clsx } from "clsx";
import { Dispatch, SetStateAction } from "react";

interface BackdropProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Backdrop({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: BackdropProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      onClick={() => setIsMobileMenuOpen(false)}
      className={clsx(
        isMobileMenuOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
        "bg-background-backdrop fixed inset-0 z-40 transition-opacity duration-300",
      )}
    ></div>
  );
}
