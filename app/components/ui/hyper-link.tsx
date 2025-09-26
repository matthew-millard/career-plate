import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

interface HyperLinkProps extends RemixLinkProps {
  children: React.ReactNode;
}

export default function HyperLink({
  children,
  className,
  ...props
}: HyperLinkProps) {
  return (
    <Link
      {...props}
      className={`text-secondary underline-offset-4 hover:underline ${className}`}
    >
      {children}
    </Link>
  );
}
