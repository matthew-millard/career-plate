import { MenuIcon, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface MenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MenuButton({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  className,
  ...props
}: MenuButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={isMobileMenuOpen}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      className={`${className}`}
      {...props}
    >
      {isMobileMenuOpen ? <X /> : <MenuIcon />}
    </button>
  );
}
