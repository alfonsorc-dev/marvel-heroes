import SearchBar from "@/components/search-bar/SearchBar";
import { DEBOUNCE_TIME, RESULTS_LIMIT } from "@/constants/search.const";
import useDebounce from "@/hooks/useDebounce";
import useGetCharacters from "@/hooks/useGetCharacters";
import type { CharactersData } from "@/models/api/GetCharactersResponse.model";
import { useState, useMemo } from "react";
import "@/styles/common.scss";
import useGetFavorites from "@/context/FavoritesContext";
import { CharacterCard } from "@/components/character-card/CharacterCard";
import { CardsContainer } from "@/components/cards-container/CardsContainer";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, DEBOUNCE_TIME);

  const { data } = useGetCharacters({
    ...(debouncedQuery ? { nameStartsWith: debouncedQuery } : {}),
  });

  const characters: CharactersData["results"] = useMemo(() => {
    return data && "results" in data
      ? data.results.slice(0, RESULTS_LIMIT)
      : [];
  }, [data]);

  const { favoriteIds, addFavoriteId, removeFavoriteId } = useGetFavorites();

  const handleSearchSubmit = (value: string | null) => {
    setQuery(value ?? "");
  };

  const handleSearchChange = (value: string | null) => {
    setQuery(value ?? "");
  };

  const handleFavoriteToggle = (characterId: string, isFavorite: boolean) => {
    (isFavorite ? removeFavoriteId : addFavoriteId)(characterId);
  };

  return (
    <>
      <div className="searchbar-fixed">
        <SearchBar
          onSubmit={handleSearchSubmit}
          onChange={handleSearchChange}
        />
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
    </>
  );
}
