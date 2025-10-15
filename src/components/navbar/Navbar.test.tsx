/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import {
  FavoritesContext,
  type FavoritesContextType,
} from "@/context/FavoritesContext";
const renderComponent = (contextValue: FavoritesContextType) => {
  return render(
    <FavoritesContext.Provider value={contextValue}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </FavoritesContext.Provider>
  );
};

describe("Navbar", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly and displays the number of favorite characters", () => {
    const mockContextValue: FavoritesContextType = {
      favoriteIds: ["1", "2", "3"],
      addFavoriteId: (_: string) => {},
      removeFavoriteId: (_: string) => {},
      clearFavorites: () => {},
    };
    renderComponent(mockContextValue);

    expect(screen.getByAltText("Marvel brand logo")).toBeInTheDocument();
    expect(screen.getByAltText("Heart icon")).toBeInTheDocument();
    const favoriteCount = screen.getByTestId("favorite-count");
    expect(favoriteCount).toBeInTheDocument();
    expect(favoriteCount).toHaveTextContent("3");
  });

  it("doesn't display any number when there are no favorites", () => {
    const mockContextValue: FavoritesContextType = {
      favoriteIds: [],
      addFavoriteId: (_: string) => {},
      removeFavoriteId: (_: string) => {},
      clearFavorites: () => {},
    };
    renderComponent(mockContextValue);

    expect(screen.queryByTestId("favorite-count")).not.toBeInTheDocument();
  });
});
