import SearchBar from "@/components/search-bar/SearchBar";
import { DEBOUNCE_TIME } from "@/constants/search.const";
import useFavorites from "@/context/FavoritesContext";
import useDebounce from "@/hooks/useDebounce";
import { useState, useMemo } from "react";
import "@/styles/common.scss";
import { CardsGrid } from "@/components/cards-grid/CardsGrid";
import { CharacterCard } from "@/components/character-card/CharacterCard";
import type { Character } from "@/models/Character";
import { sortCharactersByName } from "@/utils/characters.utils";
import "./Favorites.scss";

export default function Favorites() {
  const [query, setQuery] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query ?? "", DEBOUNCE_TIME);

  const { favorites, removeFavorite } = useFavorites();

  const characters: Character[] = useMemo(() => {
    if (debouncedQuery) {
      return favorites.filter((char) =>
        char.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }
    return sortCharactersByName(favorites);
  }, [debouncedQuery, favorites]);

  const handleFavoriteToggle = (characterId: number) => {
    removeFavorite(characterId);
  };

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
              <CharacterCard
                key={character.id}
                name={character.name}
                thumbnail={character.thumbnail}
                onFavoriteToggle={() => handleFavoriteToggle(character.id)}
                isFavorite
              />
            );
          })}
        </CardsGrid>
      </section>
    </main>
  );
}
