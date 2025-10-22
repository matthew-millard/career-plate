import { Bell } from "lucide-react";

interface ViewNotificationsProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export default function ViewNotifications({
  className,
  ...props
}: ViewNotificationsProps) {
  const hasNotifications = true;
  return (
    <button
      type="button"
      className={`relative text-foreground-muted-extra ${className}`}
      {...props}
    >
      <span className="sr-only">View notifications</span>
      <Bell aria-hidden="true" className="size-5" />
      {hasNotifications && (
        <span className="absolute right-0 top-0 size-2 animate-pulse rounded-full bg-primary ring-1 ring-primary"></span>
      )}
    </button>
  );
}
