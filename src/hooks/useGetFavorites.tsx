import {
  type FavoritesContextType,
  FavoritesContext,
} from "@/context/FavoritesContext";
import { useContext } from "react";

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
