import React, { useState as useStateMock } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/pages/index";
import "@testing-library/jest-dom";
import { TodoPost } from "@/components/dmain/TodoPost";
import { useSession } from "next-auth/react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  // useState: jest.fn(),
}));
jest.mock("next-auth/react");
describe("todoPost", () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: { user: { id: "aaa" }, access_token: "123456" },
      status: "unauthenticated",
    });
  });
  const dispatch = jest.fn();

  it("set new task", async () => {
    const user = userEvent.setup();
    render(<TodoPost dispatch={dispatch} />);
    const element = screen.getByTestId("task-input");
    await user.type(element, "test1");

    const addTaskButton = screen.getByTestId("add-task-button");
    await user.click(addTaskButton);
  });
});
