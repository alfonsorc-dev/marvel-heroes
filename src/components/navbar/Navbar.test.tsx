/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import {
  FavoritesContext,
  type FavoritesContextType,
} from "@/context/FavoritesContext";
import Navbar from "./Navbar";

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
    const mockFavorites = [
      {
        id: 1,
        name: "Iron Man",
        thumbnail: { path: "path1", extension: "jpg" },
      },
      {
        id: 2,
        name: "Captain America",
        thumbnail: { path: "path2", extension: "jpg" },
      },
      { id: 3, name: "Thor", thumbnail: { path: "path3", extension: "jpg" } },
    ];
    const mockContextValue: FavoritesContextType = {
      favorites: mockFavorites,
      addFavorite: (_character) => {},
      removeFavorite: (_id) => {},
    };
    renderComponent(mockContextValue);

    expect(
      screen.getByRole("link", { name: /Marvel brand logo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Heart icon/i })
    ).toBeInTheDocument();
    const favoriteCount = screen.getByTestId("favorite-count");
    expect(favoriteCount).toBeInTheDocument();
    expect(favoriteCount).toHaveTextContent("3");
  });

  it("doesn't display any number when there are no favorites", () => {
    const mockContextValue: FavoritesContextType = {
      favorites: [],
      addFavorite: (_character) => {},
      removeFavorite: (_id) => {},
    };
    renderComponent(mockContextValue);

    expect(screen.queryByTestId("favorite-count")).not.toBeInTheDocument();
  });
});
