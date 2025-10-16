import Layout from "./Layout";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppWrapper } from "@/utils/test.utils";

vi.mock("@/pages/favorites/Favorites.tsx", () => ({
  default: () => <div>Favorites Page</div>,
}));
vi.mock("@/pages/home/Home.tsx", () => ({
  default: () => <div>Home Page</div>,
}));

describe("Layout", () => {
  it("should show the navbar", () => {
    render(
      <AppWrapper>
        <Layout />
      </AppWrapper>
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
