import Home from "./Home";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppWrapper } from "@/utils/test.utils";

describe("Home Component", () => {
  it("renders with searchbar without crashing", () => {
    render(
      <AppWrapper>
        <Home />
      </AppWrapper>
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
    const searchSection = screen.getByRole("search");
    expect(searchSection).toBeInTheDocument();
    expect(within(searchSection).getByTestId("search-bar")).toBeInTheDocument();
  });
});
