import SearchBar from "@/components/search-bar/SearchBar";
import { DEBOUNCE_TIME, RESULTS_LIMIT } from "@/constants/search.const";
import useDebounce from "@/hooks/useDebounce";
import { useState, useMemo } from "react";
import "@/styles/common.scss";
import { CardsGrid } from "@/components/cards-grid/CardsGrid";
import { apiCharacterToCharacter } from "@/adapters/character.adapter";
import type { Character } from "@/models/Character";
import "./Home.scss";
import { ActionableCharacterCard } from "@/components/actionable-character-card/ActionableCharacterCard";
import useGetCharacters from "@/hooks/api/useGetCharacters";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, DEBOUNCE_TIME);

  const { data, isLoading } = useGetCharacters({
    limit: RESULTS_LIMIT,
    ...(debouncedQuery ? { nameStartsWith: debouncedQuery } : {}),
  });

  const characters: Character[] = useMemo(() => {
    return data && "results" in data
      ? data.results
          .slice(0, RESULTS_LIMIT)
          .map((character) => apiCharacterToCharacter(character))
      : [];
  }, [data]);

  return (
    <main className="home">
      <section role="search" className="home__fixed-content">
        <SearchBar
          resultsCount={isLoading ? undefined : characters.length}
          onChange={(value) => setQuery(value ?? "")}
        />
      </section>
      <section aria-label="Characters List" className="home__characters-grid">
        <CardsGrid>
          {characters.map((character) => (
            <ActionableCharacterCard key={character.id} character={character} />
          ))}
        </CardsGrid>
      </section>
    </main>
  );
}
