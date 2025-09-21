import { Link } from "@remix-run/react";

export default function Logo() {
  return (
    <Link to="/">
      <div className="text-lg font-semibold">Career Plate</div>
    </Link>
  );
}
