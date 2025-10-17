import SearchBar from "./SearchBar";

import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const mockOnSearch = vi.fn();

const renderContent = (resultsCount?: number) => {
  render(<SearchBar resultsCount={resultsCount} onChange={mockOnSearch} />);
};

describe("SearchBar", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the search input correctly", () => {
    renderContent();
    expect(
      screen.getByRole("textbox", { name: /Search input/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: /Search Icon/i })
    ).toBeInTheDocument();
  });

  it("renders the search input and calls onSearch with the correct value when typing", async () => {
    const user = userEvent.setup();
    renderContent();

    const input = screen.getByRole("textbox", {
      name: /Search input/i,
    });

    expect(
      screen.getByRole("textbox", { name: /Search input/i })
    ).toBeInTheDocument();

    await user.type(input, "Spider-Man");

    expect(mockOnSearch).toHaveBeenCalledTimes(10);
    expect(mockOnSearch).toHaveBeenLastCalledWith("Spider-Man");
  });

  it("displays the correct results count message when there is one result", () => {
    renderContent(1);
    expect(screen.getByRole("status")).toHaveTextContent("1 result found");
  });

  it("displays the correct results count message for multiple results", () => {
    renderContent(5);
    expect(screen.getByRole("status")).toHaveTextContent("5 results found");
  });

  it("displays '0 results found' when there are no results", () => {
    renderContent(0);
    expect(screen.getByRole("status")).toHaveTextContent("0 results found");
  });

  it("does not display any results count message when resultsCount is undefined", () => {
    renderContent(undefined);
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
});
