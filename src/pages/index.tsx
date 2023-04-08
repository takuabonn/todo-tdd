import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppBar } from "@/components/AppBar";
import { TodoPost } from "@/components/dmain/TodoPost";
import { TodoList } from "@/components/dmain/TodoList";
import { GetServerSideProps } from "next";
import { axiosClient } from "../../lib/axiosClient";
import { GetResponseData, Todo } from "types/todoType";
import { useTodo } from "../../lib/hooks/useTodo";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ todoList }: { todoList: Todo[] }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { todoState, dispatch } = useTodo(todoList);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status]);

  return (
    <>
      <AppBar />
      <TodoPost dispatch={dispatch} />
      <TodoList todoList={todoState} dispatch={dispatch} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // APIやDBからのデータ取得処理などを記載
  const { data: result, status } = await axiosClient.get<GetResponseData>(
    `/todo`
  );
  return {
    props: { todoList: result.todo_list },
  };
};
