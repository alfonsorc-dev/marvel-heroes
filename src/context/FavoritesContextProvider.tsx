import { useState, type ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";

export const FavoritesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favoriteCharacterIds, setItems] = useState<string[]>([]);

  const addFavoriteId = (id: string) => setItems((prev) => [...prev, id]);
  const removeFavoriteId = (id: string) =>
    setItems((prev) => prev.filter((i) => i !== id));
  const clearFavorites = () => setItems([]);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteCharacterIds,
        addFavoriteId,
        removeFavoriteId,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
