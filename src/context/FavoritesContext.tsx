import type { Character } from "@/models/Character";
import { createContext, useContext } from "react";

export type FavoritesContextType = {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (id: number) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const useFavorites = (): FavoritesContextType => {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    throw new Error(
      "useGetFavorites must be used within a FavoritesContextProvider"
    );
  }

  return favoritesContext;
};

export default useFavorites;
