import { ThemeSwitch } from "~/components/ui";

interface HeaderProps {
  theme: string | undefined;
}

export default function Header({ theme }: HeaderProps) {
  return (
    <header className="p-4 md:p-8">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <div>
          <img src={`/logo-${theme}.png`} alt="Remix Logo" width={100} />
          <span className="pl-1 font-semibold">Career Plate</span>
        </div>
        <ThemeSwitch />
      </div>
    </header>
  );
}
