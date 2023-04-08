import { axiosClient } from "../../../lib/axiosClient";
import { Dispatch, useEffect, useState } from "react";
import { GetResponseData, Todo } from "types/todoType";
import { useSession } from "next-auth/react";
import { ActionType } from "../../../lib/hooks/useTodo";

type PropsType = {
  todoList: Todo[];
  dispatch: Dispatch<ActionType>;
};
export const TodoList = ({ todoList, dispatch }: PropsType) => {
  return (
    <>
      <div className="w-1/2  mx-auto mt-10  border-1 divide-y"></div>
      <div className="w-1/2 mx-auto mt-20">
        {todoList.map((todo) => (
          <div
            key={todo.id}
            className="w-full h-12 bg-white mx-auto mt-10 shadow-xl border-2 py-1"
          >
            <div data-testid={`task-${todo.id}`} className="pl-10 py-1">
              {todo.task}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
