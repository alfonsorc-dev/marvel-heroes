import { createContext } from "react";

export interface FavoritesContextType {
  favoriteCharacterIds: string[];
  addFavoriteId: (id: string) => void;
  removeFavoriteId: (id: string) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);
