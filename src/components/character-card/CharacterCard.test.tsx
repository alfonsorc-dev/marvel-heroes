import { CharacterCard, type CharacterCardProps } from "./CharacterCard";

import { render, screen, within, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

const mockCharacter: CharacterCardProps = {
  name: "Spider-Man",
  thumbnail: {
    path: "https://example.com/spider-man",
    extension: "jpg",
  },
  isFavorite: false,
  onFavoriteToggle: vi.fn(),
};

const renderContent = (isFavorite: boolean) => {
  render(
    <CharacterCard
      name={mockCharacter.name}
      thumbnail={mockCharacter.thumbnail}
      isFavorite={isFavorite}
      onFavoriteToggle={mockCharacter.onFavoriteToggle}
    />
  );
};

describe("CharacterCard", () => {
  afterEach(cleanup);

  it("renders character information correctly", () => {
    renderContent(true);

    expect(screen.getByText(/Spider-Man/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Spider-Man/i)).toBeInTheDocument();

    const favoriteButton = screen.getByRole("button");
    expect(favoriteButton).toBeInTheDocument();
    expect(
      within(favoriteButton).getByAltText(/Filled Heart Icon/i)
    ).toBeInTheDocument();
  });

  it("displays an outlined heart icon when isFavorite is false", () => {
    renderContent(false);
    expect(screen.getByText(/Spider-Man/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Spider-Man/i)).toBeInTheDocument();
    const favoriteButton = screen.getByRole("button");
    const heartIcon =
      within(favoriteButton).getByAltText(/Outlined Heart icon/i);
    expect(heartIcon).toBeInTheDocument();
  });

  it("calls onFavoriteToggle when the favorite button is clicked", async () => {
    const user = userEvent.setup();
    renderContent(false);

    const favoriteButton = screen.getByRole("button");
    await user.click(favoriteButton);

    expect(mockCharacter.onFavoriteToggle).toHaveBeenCalledTimes(1);
  });
});
