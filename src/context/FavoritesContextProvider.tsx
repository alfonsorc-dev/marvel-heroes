import { useState, useCallback, type ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";
import type { Character } from "@/models/Character";

export const FavoritesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  const addFavorite = useCallback((character: Character) => {
    setFavorites((prev) => {
      const currentFavoritesMap = new Map(prev.map((item) => [item.id, item]));
      currentFavoritesMap.set(character.id, character);
      return Array.from(currentFavoritesMap.values());
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((character) => character.id !== id));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
