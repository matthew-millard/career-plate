import { clsx } from "clsx";
import { Dispatch, SetStateAction } from "react";

interface DesktopSidebarProps extends React.HTMLAttributes<HTMLElement> {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function DesktopSidebar({
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
        "fixed bottom-0 left-0 top-0 z-30 border-r bg-card transition-all",
        expanded ? "w-64" : "w-16",
        className,
      )}
    >
      <div className="">
        <div className="h-20 border-b"></div>
      </div>
    </aside>
  );
}
