import { axiosClient } from "../axiosClient";
import { useEffect, useReducer, useState } from "react";
import { GetResponseData, Todo } from "types/todoType";

export type ActionType = {
  type: "ADD_TODO";
  payload: Todo;
};

export function useTodo(initTodoList: Todo[]) {
  const reducer = (state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD_TODO":
        return [...state, action.payload];
    }
  };

  const [todoState, dispatch] = useReducer(reducer, initTodoList);

  return { todoState, dispatch };
}
