import { ComicCard, type ComicCardProps } from "./ComicCard";

import { render, screen, within, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";

const mockComic: ComicCardProps = {
  title: "Spider-Man",
  thumbnail: {
    path: "https://example.com/spider-man",
    extension: "jpg",
  },
  dates: [],
};

const renderContent = () => {
  render(
    <ComicCard
      title={mockComic.title}
      thumbnail={mockComic.thumbnail}
      dates={[]}
    />
  );
};

describe("ComicCard", () => {
  afterEach(cleanup);

  it("renders character information correctly", () => {
    renderContent();

    expect(screen.getByText(/Spider-Man/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Spider-Man/i)).toBeInTheDocument();

    const favoriteButton = screen.getByRole("button");
    expect(favoriteButton).toBeInTheDocument();
    expect(
      within(favoriteButton).getByAltText(/Filled Heart Icon/i)
    ).toBeInTheDocument();
  });
});
