import { Search, X } from "lucide-react";
import { useFetcher } from "@remix-run/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

interface SearchInputProps {
  placeholder: string;
}

export default function SearchInput({ placeholder }: SearchInputProps) {
  const fetcher = useFetcher({ key: "search" });
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query === "") {
      inputRef.current?.focus();
    }
  }, [query]);

  return (
    <fetcher.Form method="GET" className="grid flex-1 grid-cols-1">
      <Search
        aria-hidden="true"
        className={clsx(
          isFocused || query ? "text-primary" : "text-placeholder",
          "pointer-events-none col-start-1 row-start-1 size-5 self-center",
        )}
      />
      <input
        className="col-start-1 row-start-1 size-full border-none bg-transparent pl-8 caret-primary outline-none"
        type="search"
        aria-label="search"
        placeholder={isFocused ? "" : placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        ref={inputRef}
      />
      {query && <SearchCancelButton setQuery={setQuery} />}
    </fetcher.Form>
  );
}

interface SearchCancelButtonProps {
  setQuery: Dispatch<SetStateAction<string>>;
}

function SearchCancelButton({ setQuery }: SearchCancelButtonProps) {
  return (
    <button
      type="button"
      className="col-start-2 row-start-1 rounded-full p-2 text-secondary transition-transform duration-200 hover:scale-110 hover:bg-card"
      onClick={() => setQuery("")}
    >
      <X className="size-4 transition-transform duration-200" />
    </button>
  );
}
