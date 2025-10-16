import { Outlet } from "@remix-run/react";
import { Footer } from "~/components/ui";
import { PublicHeader } from "~/components/layout";

export default function PublicLayout() {
  return (
    <div>
      <PublicHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
