import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/pages/index";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { TodoList } from "@/components/dmain/TodoList";
import { Todo } from "types/todoType";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
}));
jest.mock("next-auth/react");
describe("todoList", () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { id: "aaa" }, access_token: "123456" },
      status: "unauthenticated",
    });
  });
  it("display task list", async () => {
    await act(async () => {
      render(<TodoList />);
    });

    const element1 = screen.getByTestId("task-1");
    const element2 = screen.getByTestId("task-2");
    expect(element1).toHaveTextContent("task1");
    expect(element2).toHaveTextContent("task2");
  });
});
