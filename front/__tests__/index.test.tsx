import "setimmediate";

if (!global.setImmediate) {
  // @ts-ignore
  global.setImmediate = setTimeout;
}

window.HTMLElement.prototype.scrollIntoView = function () {};

import { fireEvent, render, screen } from "@testing-library/react";
import Chat from "../components/chat";
import "@testing-library/jest-dom";

describe("Chat", () => {
  it("renders chat", () => {
    render(<Chat />);
  });
});
