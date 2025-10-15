import { createContext, useContext } from "react";

export type FavoritesContextType = {
  favoriteIds: string[];
  addFavoriteId: (id: string) => void;
  removeFavoriteId: (id: string) => void;
  clearFavorites: () => void;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null
);

const useGetFavorites = (): FavoritesContextType => {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    throw new Error(
      "useGetFavorites must be used within a FavoritesContextProvider"
    );
  }

  return favoritesContext;
};

export default useGetFavorites;
