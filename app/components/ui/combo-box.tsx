import { Check, ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button, Input } from "~/components/ui";

interface ComboboxProps {
  children: React.ReactNode;
}

interface ComboboxContainerProps {
  children: React.ReactNode;
}

export default function Combobox({ children }: ComboboxProps) {
  return <div>{children}</div>;
}

export function ComboboxContainer({ children }: ComboboxContainerProps) {
  return <div className="relative">{children}</div>;
}

interface ComboboxInputProps {
  setQuery: Dispatch<SetStateAction<string>>;
}

export function ComboboxInput({ setQuery }: ComboboxInputProps) {
  return (
    <Input
      onChange={(e) => setQuery(e.target.value)}
      onBlur={() => setQuery("")}
    />
  );
}

export function ComboboxButton() {
  return (
    <Button
      disabled
      variant="ghost"
      size="icon"
      className="absolute inset-y-0 right-0 pr-4"
    >
      <ChevronDown aria-hidden />
    </Button>
  );
}

interface ComboboxOptions {
  children: React.ReactNode;
}

export function ComboboxOptions({ children }: ComboboxOptions) {
  return (
    <div className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border bg-card shadow-lg">
      {children}
    </div>
  );
}

interface ComboboxOptionProps {
  value: string;
}
export function ComboboxOption({ value }: ComboboxOptionProps) {
  return (
    <div
      role="option"
      tabIndex={-1}
      aria-selected="false"
      className="hover:bg-card-hover relative px-3 py-2"
    >
      <span className="truncate font-normal">{value}</span>
      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
        <Check size={16} className="text-primary" />
      </span>
    </div>
  );
}
