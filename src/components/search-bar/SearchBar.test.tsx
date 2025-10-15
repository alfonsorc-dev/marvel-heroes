import SearchBar from "./SearchBar";

import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const mockOnSearch = vi.fn();

const renderContent = () => {
  render(<SearchBar onChange={mockOnSearch} />);
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
      screen.getByRole("button", { name: /Search Icon/i })
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
});
