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
      hidden={!isMobileMenuOpen}
      aria-hidden="true"
      role="presentation"
      onClick={() => setIsMobileMenuOpen(false)}
      className="fixed inset-0 z-40 bg-slate-700/50"
    ></div>
  );
}
