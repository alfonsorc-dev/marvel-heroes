import SearchBar from "@/components/search-bar/SearchBar";
import { DEBOUNCE_TIME } from "@/constants/search.const";
import useGetFavorites from "@/context/FavoritesContext";
import useDebounce from "@/hooks/useDebounce";
import useGetCharacters from "@/hooks/useGetCharacters";
import type { CharactersData } from "@/models/api/GetCharactersResponse.model";
import { useState, useMemo } from "react";
import "@/styles/common.scss";
import { CardsContainer } from "@/components/cards-container/CardsContainer";
import { CharacterCard } from "@/components/character-card/CharacterCard";

export default function Favorites() {
  const [query, setQuery] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query ?? "", DEBOUNCE_TIME);

  const { data } = useGetCharacters({});

  const { favoriteIds, addFavoriteId, removeFavoriteId } = useGetFavorites();

  const characters: CharactersData["results"] = useMemo(() => {
    if (!data || !("results" in data)) return [];
    const favorites = data.results.filter((character) => {
      return favoriteIds.includes(character.id.toString());
    });

    if (debouncedQuery) {
      return favorites.filter((char) =>
        char.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }
    return favorites;
  }, [data, debouncedQuery, favoriteIds]);

  const handleFavoriteToggle = (characterId: string, isFavorite: boolean) => {
    (isFavorite ? removeFavoriteId : addFavoriteId)(characterId);
  };

  return (
    <div className="search-page-container">
      <div className="searchbar-fixed">
        <SearchBar onChange={setQuery} />
      </div>
      <CardsContainer>
        {characters.map((character) => {
          const isFavorite =
            favoriteIds?.includes(character.id.toString()) ?? false;
          return (
            <CharacterCard
              key={character.id}
              name={character.name}
              thumbnail={character.thumbnail}
              isFavorite={isFavorite}
              onFavoriteToggle={() =>
                handleFavoriteToggle(character.id.toString(), isFavorite)
              }
            />
          );
        })}
      </CardsContainer>
    </div>
  );
}
