import { Outlet } from "@remix-run/react";
import { Footer, Header } from "~/components/ui";

export default function PublicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
