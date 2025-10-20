import { getUserInitials } from "~/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  profileImageUrl: string | null;
  firstName: string;
  lastName: string;
}

export default function Avatar({
  className,
  profileImageUrl,
  firstName,
  lastName,
}: AvatarProps) {
  const usersInitials = getUserInitials(firstName, lastName);
  return (
    <span
      className={`relative inline-block size-10 overflow-hidden rounded-full border bg-card ${className}`}
    >
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          className="aspect-square h-full w-full object-cover"
          alt={`${firstName} ${lastName}`}
        />
      ) : (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
          {usersInitials}
        </span>
      )}
    </span>
  );
}
