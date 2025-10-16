/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FavoritesContext,
  type FavoritesContextType,
} from "@/context/FavoritesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router-dom";

type Props = {
  favoritesContextValue?: FavoritesContextType;
  children?: React.ReactNode;
};

const favoritesContextDefaultValue: FavoritesContextType = {
  favorites: [
    {
      id: 1,
      name: "Spider-Man",
      thumbnail: { path: "fake/path", extension: "jpg" },
    },
  ],
  addFavorite: (_character) => {},
  removeFavorite: (_id) => {},
};

export const AppWrapper: React.FC<Props> = ({
  children,
  favoritesContextValue = favoritesContextDefaultValue,
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FavoritesContext.Provider value={favoritesContextValue}>
          {children}
        </FavoritesContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
