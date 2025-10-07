import { Check, ChevronDown } from "lucide-react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Button, Input } from "~/components/ui";

interface ComboboxProps {
  children: React.ReactNode;
}

interface ComboboxContainerProps {
  children: React.ReactNode;
}

interface ComboboxContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selected: string | null;
  setSelected: Dispatch<SetStateAction<string | null>>;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

export default function Combobox({ children }: ComboboxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <ComboboxContext.Provider
      value={{ isOpen, setIsOpen, selected, setSelected }}
    >
      <div>{children}</div>
    </ComboboxContext.Provider>
  );
}

export function ComboboxContainer({ children }: ComboboxContainerProps) {
  return <div className="relative">{children}</div>;
}

interface ComboboxInputProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export function ComboboxInput({ query, setQuery }: ComboboxInputProps) {
  const context = useContext(ComboboxContext);
  if (!context) throw new Error("Must be within the Combobox provider");
  const { setIsOpen, selected, setSelected } = context;
  return (
    <Input
      value={selected ?? query}
      onChange={(e) => {
        setSelected(null);
        setQuery(e.target.value);
      }}
      onFocus={() => setIsOpen(true)}
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
  const context = useContext(ComboboxContext);
  if (!context) throw new Error("Must be within the Combobox provider");
  const { isOpen } = context;
  return (
    <div
      hidden={!isOpen}
      className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border bg-card shadow-lg"
    >
      {children}
    </div>
  );
}

interface ComboboxOptionProps {
  value: string;
}
export function ComboboxOption({ value }: ComboboxOptionProps) {
  const context = useContext(ComboboxContext);
  if (!context) throw new Error("Must be within the Combobox provider");

  const { selected, setSelected, setIsOpen } = context;

  const isSelected = selected === value;
  return (
    <div
      role="option"
      tabIndex={0}
      aria-selected={isSelected}
      className="hover:bg-card-hover focus-visible:bg-card-hover relative rounded-md px-3 py-2 focus-visible:outline-none"
      onMouseDown={() => {
        setSelected(value);
        setIsOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelected(value);
          setIsOpen(false);
        }
      }}
    >
      {isSelected ? (
        <>
          <span className="truncate font-semibold">{value}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
            <Check size={16} className="text-primary" />
          </span>
        </>
      ) : (
        <span className="truncate font-normal">{value}</span>
      )}
    </div>
  );
}
