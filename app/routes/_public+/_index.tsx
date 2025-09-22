import { MetaFunction } from "@remix-run/node";
import { BentoGrid } from "~/components/ui";

export const meta: MetaFunction = () => {
  return [
    { title: "Career Plate - Connect Hospitality Professionals" },
    {
      name: "description",
      content:
        "Career Plate connects FOH and BOH hospitality professionals with opportunities, networking, and career growth. Join the premier directory for restaurant, hotel, and service industry talent.",
    },
  ];
};

export async function loader() {
  return null;
}

export async function action() {
  return null;
}

export default function Index() {
  return (
    <div className="py-10 sm:py-20">
      <div className="container max-w-7xl">
        <h2 className="text-primary text-base/7 font-semibold">
          Connect. Grow. Thrive.
        </h2>
        <p className="mt-2 max-w-2xl text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
          Where hospitality professionals find their next opportunity
        </p>
        <BentoGrid />
      </div>
    </div>
  );
}
