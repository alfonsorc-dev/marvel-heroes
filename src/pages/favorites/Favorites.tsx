import SearchBar from "@/components/search-bar/SearchBar";
import { DEBOUNCE_TIME } from "@/constants/search.const";
import useDebounce from "@/hooks/useDebounce";
import { useState, useMemo } from "react";
import "@/styles/common.scss";
import { CardsGrid } from "@/components/cards-grid/CardsGrid";
import type { Character } from "@/models/Character";
import { sortCharactersByName } from "@/utils/characters.utils";
import "./Favorites.scss";
import useFavorites from "@/hooks/useGetFavorites";
import { ActionableCharacterCard } from "@/components/actionable-character-card/ActionableCharacterCard";

export default function Favorites() {
  const [query, setQuery] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query ?? "", DEBOUNCE_TIME);

  const { favorites } = useFavorites();

  const characters: Character[] = useMemo(() => {
    if (debouncedQuery) {
      return favorites.filter((character: Character) =>
        character.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }
    return sortCharactersByName(favorites);
  }, [debouncedQuery, favorites]);

  return (
    <main className="favorites">
      <div className="favorites__fixed-content">
        <h2 className="title">FAVORITES</h2>
        <section role="search">
          <SearchBar resultsCount={characters.length} onChange={setQuery} />
        </section>
      </div>

      <section
        aria-label="Favorites List"
        className="favorites__characters-grid"
      >
        <CardsGrid>
          {characters.map((character) => {
            return (
              <ActionableCharacterCard
                key={character.id}
                character={character}
              />
            );
          })}
        </CardsGrid>
      </section>
    </main>
  );
}
