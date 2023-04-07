import { axiosClient } from "../../../lib/axiosClient";
import { useEffect, useState } from "react";
import { GetResponseData, Todo } from "types/todoType";
import { useSession } from "next-auth/react";

export const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data: result, status } = await axiosClient.get<GetResponseData>(
        `/todo`
      );
      console.log(result);
      setTodoList(result.todo_list);
    };
    fetch();
  }, []);
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
