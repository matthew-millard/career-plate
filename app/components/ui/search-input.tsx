import { Search, X } from "lucide-react";
import { useFetcher } from "@remix-run/react";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({ placeholder }: SearchInputProps) {
  const fetcher = useFetcher({ key: "search" });
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <fetcher.Form method="GET" className="grid flex-1 grid-cols-1">
      <Search
        aria-hidden="true"
        className={
          "pointer-events-none col-start-1 row-start-1 size-5 self-center text-foreground-muted-extra"
        }
      />
      <input
        className="col-start-1 row-start-1 border-none bg-transparent pl-8 outline-none placeholder:truncate"
        type="search"
        aria-label="search"
        placeholder={isFocused ? "" : placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        ref={inputRef}
      />
      {query && <SearchCancelButton setQuery={setQuery} inputRef={inputRef} />}
    </fetcher.Form>
  );
}

interface SearchCancelButtonProps {
  setQuery: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement>;
}

function SearchCancelButton({ setQuery, inputRef }: SearchCancelButtonProps) {
  return (
    <button
      type="button"
      className="col-start-2 row-start-1 rounded-full p-2 text-secondary transition-transform duration-200 hover:scale-110 hover:bg-card"
      onClick={() => {
        setQuery("");
        inputRef?.current?.focus();
      }}
    >
      <X className="size-4 transition-transform duration-200" />
    </button>
  );
}
