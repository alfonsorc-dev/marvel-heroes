import SearchBar from "@/components/search-bar/SearchBar";
import { DEBOUNCE_TIME, RESULTS_LIMIT } from "@/constants/search.const";
import useDebounce from "@/hooks/useDebounce";
import useGetCharactersFromAPI from "@/hooks/useGetCharactersFromAPI";
import { useState, useMemo } from "react";
import "@/styles/common.scss";
import useFavorites from "@/context/FavoritesContext";
import { CharacterCard } from "@/components/character-card/CharacterCard";
import { CardsGrid } from "@/components/cards-grid/CardsGrid";
import { apiCharacterToCharacter } from "@/adapters/character.adapter";
import type { Character } from "@/models/Character";
import "./Home.scss";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, DEBOUNCE_TIME);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { data, isLoading } = useGetCharactersFromAPI({
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

  const handleFavoriteToggle = (character: Character, isFavorite: boolean) => {
    return isFavorite ? removeFavorite(character.id) : addFavorite(character);
  };

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
          {characters.map((character) => {
            const isFavorite = !!favorites?.find(
              (fav) => fav.id === character.id
            );

            return (
              <CharacterCard
                key={character.id}
                name={character.name}
                thumbnail={character.thumbnail}
                isFavorite={isFavorite}
                onFavoriteToggle={() =>
                  handleFavoriteToggle(character, isFavorite)
                }
              />
            );
          })}
        </CardsGrid>
      </section>
    </main>
  );
}
