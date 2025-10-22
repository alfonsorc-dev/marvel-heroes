import { ComicCard, type ComicCardProps } from "./ComicCard";

import { render, screen, cleanup } from "@testing-library/react";
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
      dates={[{ type: "onsaleDate", date: "2020-01-01T00:00:00-0500" }]}
    />
  );
};

describe("ComicCard", () => {
  afterEach(cleanup);

  it("renders comic information correctly", () => {
    renderContent();
    expect(screen.getByText(/Spider-Man/i)).toBeInTheDocument();
    expect(screen.getByText(/2020/i)).toBeInTheDocument();
  });
});
