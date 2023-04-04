import axios from "axios";
import { axiosClient } from "../../../lib/axiosClient";
import { useSession } from "next-auth/react";
import { useCallback, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";

export const TodoPost = () => {
  const taskRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const addTodo = useCallback(async () => {
    const { data, status } = await axiosClient.post("/todo", {
      user_id: session?.user.id,
      task: taskRef.current?.value,
    });
  }, [session]);

  return (
    <div className="w-4/12 h-24  mx-auto mt-10">
      <div className="h-3/5 shadow-lg pb-5  bg-sky-900 flex justify-center items-center">
        <input
          className="w-4/5 h-full border-2 border-slate-300 rounded mx-auto block mt-5 text-center"
          data-testid="task-input"
          ref={taskRef}
        />
      </div>
      <button
        data-testid="add-task-button"
        onClick={addTodo}
        className="block w-32  bg-sky-900 mt-5 mx-auto text-white text-2xl shadow-2xl drop-shadow-md rounded py-1"
      >
        add task
      </button>
    </div>
  );
};
