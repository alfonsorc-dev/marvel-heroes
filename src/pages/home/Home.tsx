import SearchBar from "@/components/search-bar/SearchBar";
import { DEBOUNCE_TIME, RESULTS_LIMIT } from "@/constants/search.const";
import useDebounce from "@/hooks/useDebounce";
import useGetCharacters from "@/hooks/useGetCharacters";
import type { CharactersData } from "@/models/api/GetCharactersResponse.model";
import { useState, useMemo } from "react";
import "@/styles/common.scss";

export default function Home() {
  const [query, setQuery] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query ?? "", DEBOUNCE_TIME);

  const { data } = useGetCharacters({
    ...(debouncedQuery ? { nameStartsWith: debouncedQuery } : {}),
  });

  const characters: CharactersData["results"] = useMemo(() => {
    return data && "results" in data
      ? data.results.slice(0, RESULTS_LIMIT)
      : [];
  }, [data]);

  return (
    <>
      <div className="searchbar-fixed">
        <SearchBar onSubmit={setQuery} onChange={setQuery} />
      </div>
      {JSON.stringify(characters)}
    </>
  );
}
