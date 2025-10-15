import SearchBar from "@/components/search-bar/SearchBar";
import { useState } from "react";
import "@/styles/common.scss";

export default function Favorites() {
  const [query, setQuery] = useState<string | null>(null);

  return (
    <div className="searchbar-fixed">
      <SearchBar onSubmit={setQuery} onChange={setQuery} />
    </div>
  );
}
