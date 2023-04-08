import { axiosClient } from "../axiosClient";
import { useEffect, useReducer, useState } from "react";
import { GetResponseData, Todo } from "types/todoType";

export type ActionType =
  | {
      type: "ADD_TODO";
      payload: Todo;
    }
  | {
      type: "COMPLETE_TODO";
      payload: {
        targetId: string;
      };
    }
  | {
      type: "UN_COMPLETE_TODO";
      payload: {
        targetId: string;
      };
    };

export function useTodo(initTodoList: Todo[]) {
  const reducer = (state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD_TODO":
        return [...state, action.payload];
      case "COMPLETE_TODO":
        return state.map((todo) =>
          todo.id === action.payload.targetId
            ? { ...todo, is_completed: true }
            : todo
        );
      case "UN_COMPLETE_TODO":
        return state.map((todo) =>
          todo.id === action.payload.targetId
            ? { ...todo, is_completed: false }
            : todo
        );
    }
  };

  const [todoState, dispatch] = useReducer(reducer, initTodoList);

  return { todoState, dispatch };
}
