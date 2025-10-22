import { Bell } from "lucide-react";

export default function ViewNotifications() {
  return (
    <button type="button" className="text-foreground-muted-extra">
      <span className="sr-only">View notifications</span>
      <Bell aria-hidden="true" className="size-5" />
    </button>
  );
}
