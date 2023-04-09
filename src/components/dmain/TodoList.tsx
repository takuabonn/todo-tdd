import { axiosClient } from "../../../lib/axiosClient";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { GetResponseData, Todo } from "types/todoType";
import { useSession } from "next-auth/react";
import { ActionType } from "../../../lib/hooks/useTodo";

type PropsType = {
  todoList: Todo[];
  dispatch: Dispatch<ActionType>;
};
export const TodoList = ({ todoList, dispatch }: PropsType) => {
  const [todoListState, setTodoListState] = useState<Todo[]>([]);
  useEffect(() => {
    setTodoListState(todoList);
  }, [todoList]);

  const [completedTaskHidden, setHidden] = useState(false);

  const onChangeCompletedTaskDisplayStatus = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.checked);
      if (e.target.checked) {
        setTodoListState((preTodo) =>
          preTodo.filter((todo) => !todo.is_completed)
        );
        setHidden(true);
      } else {
        setTodoListState(todoList);
        setHidden(false);
      }
    },
    []
  );
  const onChangeCompleteStatus = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
      await axiosClient.put("/todo/changeCompleteStatus", {
        id: todo.id,
        is_completed: !todo.is_completed,
      });
      if (todo.is_completed) {
        dispatch({ type: "UN_COMPLETE_TODO", payload: { targetId: todo.id } });
      } else {
        dispatch({ type: "COMPLETE_TODO", payload: { targetId: todo.id } });
      }
    },
    []
  );
  return (
    <>
      <div className="w-1/2  mx-auto mt-10  border-1 divide-y"></div>
      <div className="w-1/2 mx-auto mt-20">
        <div className="">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              data-testid="cmpleted-task-hidden-toggle"
              onChange={onChangeCompletedTaskDisplayStatus}
            />
            <div className="w-16 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-10 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-900"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {completedTaskHidden
                ? "完了済みタスクを非表示"
                : "完了済みタスクも表示"}
            </span>
          </label>
        </div>
        <div data-testid="todo-list-block">
          {todoListState.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-around items-center w-full h-12 bg-white mx-auto mt-10 shadow-xl border-2 py-1"
            >
              <div data-testid={`task-${todo.id}`} className="pl-10 py-1">
                {todo.task}
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={todo.is_completed}
                    className="sr-only peer"
                    data-testid="task-toggle"
                    onChange={(e) => onChangeCompleteStatus(e, todo)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-900"></div>
                  <span
                    data-testid={`task-${todo.id}-complete-toggle`}
                    className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {todo.is_completed ? "完了" : "未完了"}
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
