import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, afterEach } from "vitest";
import App from "./App";

describe("App navigation", () => {
  afterEach(cleanup);

  it("should be able to navigate to the favorites page", async () => {
    render(<App />);
    expect(window.location.pathname).toBe("/");
    const user = userEvent.setup();
    const heartIcon = screen.getByAltText("Heart icon");
    await user.click(heartIcon);
    expect(window.location.pathname).toBe("/favorites");
  });

  it("should be able to navigate to the home page", async () => {
    render(<App />);
    const user = userEvent.setup();
    const heartIcon = screen.getByAltText("Heart icon");
    const logo = screen.getByAltText("Marvel brand logo");
    await user.click(heartIcon);
    expect(window.location.pathname).toBe("/favorites");
    await user.click(logo);
    expect(window.location.pathname).toBe("/");
  });
});
