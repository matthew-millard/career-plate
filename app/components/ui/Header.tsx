import { ThemeSwitch } from "~/components/ui";

export default function Header() {
  return (
    <header className="p-4 md:p-8">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <span className="text-3xl font-bold italic tracking-tight text-primary underline underline-offset-2">
          Guestify
        </span>
        <ThemeSwitch />
      </div>
    </header>
  );
}
