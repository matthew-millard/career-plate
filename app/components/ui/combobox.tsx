import {
  Combobox as ComboboxPrimitive,
  ComboboxInput as ComboboxInputPrimitive,
  ComboboxButton as ComboboxButtonPrimitive,
  ComboboxOptions as ComboboxOptionsPrimitive,
  ComboboxOption as ComboboxOptionPrimitive,
  type ComboboxOptionsProps,
  type ComboboxOptionProps,
  type ComboboxInputProps,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type ComboboxProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive>;

export function Combobox({ children, ...props }: ComboboxProps) {
  return <ComboboxPrimitive {...props}>{children}</ComboboxPrimitive>;
}

export function ComboboxContainer({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

export function ComboboxInput({ ...props }: ComboboxInputProps) {
  return (
    <ComboboxInputPrimitive
      {...props}
      className="aria-[invalid]:ring-destructive mt-1 flex h-9 w-full rounded-md border bg-transparent py-1.5 pl-3 pr-9 text-base transition-colors placeholder:text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}

export function ComboboxButton() {
  return (
    <ComboboxButtonPrimitive className="absolute inset-y-9 right-0 pr-3">
      <ChevronDown className="size-5 text-foreground-muted" aria-hidden />
    </ComboboxButtonPrimitive>
  );
}

interface _ComboboxOptionsProps extends ComboboxOptionsProps {
  children: React.ReactNode;
}

export function ComboboxOptions({ children, ...props }: _ComboboxOptionsProps) {
  return (
    <ComboboxOptionsPrimitive
      transition
      className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border bg-card shadow-lg data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
      {...props}
    >
      {children}
    </ComboboxOptionsPrimitive>
  );
}

export function ComboboxOption({ value, ...props }: ComboboxOptionProps) {
  return (
    <ComboboxOptionPrimitive
      value={value}
      className="hover:bg-card-hover focus-visible:bg-card-hover data-[focus]:bg-card-hover relative rounded-md px-3 py-2 focus-visible:outline-none data-[focus]:outline-none"
      {...props}
    >
      <span className="truncate font-normal">{value}</span>
    </ComboboxOptionPrimitive>
  );
}
