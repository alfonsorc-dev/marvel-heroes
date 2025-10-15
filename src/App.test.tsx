import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, afterEach } from "vitest";
import App from "./App";

describe("App", () => {
  afterEach(cleanup);

  it("should be able to navigate to the favorites page", async () => {
    render(<App />);
    expect(window.location.pathname).toBe("/");
    const user = userEvent.setup();
    const heartIcon = screen.getByRole("img", { name: /Heart icon/i });
    await user.click(heartIcon);
    expect(window.location.pathname).toBe("/favorites");
  });

  it("should be able to navigate to the home page", async () => {
    render(<App />);
    const user = userEvent.setup();
    const heartIcon = screen.getByRole("img", { name: /Heart icon/i });
    const logo = screen.getByRole("link", { name: /Marvel brand logo/i });
    await user.click(heartIcon);
    expect(window.location.pathname).toBe("/favorites");
    await user.click(logo);
    expect(window.location.pathname).toBe("/");
  });
});
