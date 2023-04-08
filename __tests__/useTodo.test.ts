import { act, renderHook } from "@testing-library/react";
import { useTodo } from "../lib/hooks/useTodo";
import React, { useState as useStateMock } from "react";
import { Todo } from "types/todoType";

describe("useTodo", () => {
  test("add todo", async () => {
    const { result } = renderHook(() =>
      useTodo([
        {
          id: "xxx",
          task: "task1",
          user_id: "aaa",
        },
        {
          id: "yyy",
          task: "task2",
          user_id: "aaa",
        },
      ])
    );

    await act(async () => {
      const dispatch = result.current.dispatch;
      dispatch({
        type: "ADD_TODO",
        payload: {
          id: "zzz",
          task: "task3",
          user_id: "aaa",
        },
      });
    });
    expect(result.current.todoState).toHaveLength(3);
  });
});
