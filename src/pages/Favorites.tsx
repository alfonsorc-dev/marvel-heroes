import SearchBar from "@/components/search-bar/SearchBar";
import { DEBOUNCE_TIME } from "@/constants/search.const";
import useFavorites from "@/context/FavoritesContext";
import useDebounce from "@/hooks/useDebounce";
import { useState, useMemo } from "react";
import "@/styles/common.scss";
import { CardsContainer } from "@/components/cards-container/CardsContainer";
import { CharacterCard } from "@/components/character-card/CharacterCard";
import type { Character } from "@/models/Character";
import { sortCharactersByName } from "@/utils/characters.utils";

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
    <div className="search-page-container">
      <div className="searchbar-fixed">
        <SearchBar onChange={setQuery} />
      </div>
      <CardsContainer>
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
      </CardsContainer>
    </div>
  );
}
