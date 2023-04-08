import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/pages/index";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { TodoList } from "@/components/dmain/TodoList";
import { Todo } from "types/todoType";
import { TodoPost } from "@/components/dmain/TodoPost";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
}));
jest.mock("next-auth/react");
describe("todoList", () => {
  const dispatch = jest.fn();
  const mockTodoList = [
    {
      id: "1",
      task: "task1",
      user_id: "aaa",
    },
    {
      id: "2",
      task: "task2",
      user_id: "aaa",
    },
  ];
  it("display task list", async () => {
    await act(async () => {
      render(<TodoList todoList={mockTodoList} dispatch={dispatch} />);
    });

    const element1 = screen.getByTestId("task-1");
    const element2 = screen.getByTestId("task-2");
    expect(element1).toHaveTextContent("task1");
    expect(element2).toHaveTextContent("task2");
  });
});
