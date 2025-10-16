import {
  FavoritesContext,
  type FavoritesContextType,
} from "@/context/FavoritesContext";
import Layout from "./Layout";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/pages/favorites/Favorites.tsx", () => ({
  default: () => <div>Favorites Page</div>,
}));
vi.mock("@/pages/home/Home.tsx", () => ({
  default: () => <div>Home Page</div>,
}));

describe("Layout", () => {
  it("should show the navbar", () => {
    render(
      <Router>
        <FavoritesContext.Provider value={{} as FavoritesContextType}>
          <Layout />
        </FavoritesContext.Provider>
      </Router>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
