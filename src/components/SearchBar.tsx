import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

type Props = {
  search: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({ search, onSearch }: Props) {
  return (
    <div className="flex w-full items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-100 px-5 py-4 transition focus-within:border-zinc-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-zinc-100">
      <Search size={20} className="shrink-0 text-zinc-500" />

      <input
        type="search"
        value={search}
        onChange={onSearch}
        placeholder="Search photos or authors..."
        aria-label="Search photos by author"
        className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-500"
      />
    </div>
  );
}