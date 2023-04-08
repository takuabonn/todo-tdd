import React from "react";
import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/pages/index";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { TodoList } from "@/components/dmain/TodoList";
import { Todo } from "types/todoType";
import { TodoPost } from "@/components/dmain/TodoPost";
import { useTodo } from "../lib/hooks/useTodo";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
}));
jest.mock("next-auth/react");
describe("todoList", () => {
  it("display task list", async () => {
    const { result } = renderHook(() =>
      useTodo([
        {
          id: "1",
          task: "task1",
          user_id: "aaa",
          is_completed: false,
        },
        {
          id: "2",
          task: "task2",
          user_id: "aaa",
          is_completed: false,
        },
      ])
    );
    await act(async () => {
      render(
        <TodoList
          todoList={result.current.todoState}
          dispatch={result.current.dispatch}
        />
      );
    });

    const element1 = screen.getByTestId("task-1");
    const element2 = screen.getByTestId("task-2");
    const toggleButton1 = screen.getByTestId("task-1-complete-toggle");
    const toggleButton2 = screen.getByTestId("task-2-complete-toggle");
    expect(element1).toHaveTextContent("task1");
    expect(element2).toHaveTextContent("task2");
    expect(toggleButton1.textContent).toBe("未完了");
    expect(toggleButton2.textContent).toBe("未完了");
  });

  it("complete task", async () => {
    const { result } = renderHook(() =>
      useTodo([
        {
          id: "1",
          task: "task1",
          user_id: "aaa",
          is_completed: false,
        },
        {
          id: "2",
          task: "task2",
          user_id: "aaa",
          is_completed: false,
        },
      ])
    );

    const { rerender } = render(
      <TodoList
        todoList={result.current.todoState}
        dispatch={result.current.dispatch}
      />
    );
    const user = userEvent.setup();
    const toggleButton1 = screen.getAllByTestId("task-toggle")[0];
    await user.click(toggleButton1);

    rerender(
      <TodoList
        todoList={result.current.todoState}
        dispatch={result.current.dispatch}
      />
    );
    expect(result.current.todoState[0].is_completed).toBe(true);
    const toggleButton1Text = screen.getByTestId("task-1-complete-toggle");
    expect(toggleButton1Text.textContent).toBe("完了");
  });

  it("not display completed task", async () => {
    const { result } = renderHook(() =>
      useTodo([
        {
          id: "1",
          task: "task1",
          user_id: "aaa",
          is_completed: true,
        },
        {
          id: "2",
          task: "task2",
          user_id: "aaa",
          is_completed: false,
        },
      ])
    );

    const { rerender } = render(
      <TodoList
        todoList={result.current.todoState}
        dispatch={result.current.dispatch}
      />
    );

    const todoListBeforeClick = screen.getByTestId("todo-list-block");
    expect(todoListBeforeClick.childElementCount).toBe(2);

    const user = userEvent.setup();
    const toggleButton1 = screen.getByTestId("cmpleted-task-hidden-toggle");
    await user.click(toggleButton1);
    const todoListAfterClick = screen.getByTestId("todo-list-block");
    expect(todoListAfterClick.childElementCount).toBe(1);
  });
});
