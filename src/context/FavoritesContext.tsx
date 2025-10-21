import type { Character } from "@/models/Character";
import { createContext } from "react";

export type FavoritesContextType = {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (id: number) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);
