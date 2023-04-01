import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppBar } from "@/components/AppBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status]);

  return (
    <>
      {/* <div className="w-screen h-16 bg-sky-900 text-4xl pl-5 py-2 text-white">
        TODO
      </div>
      {session && <button onClick={() => signOut()}>ログアウト</button>} */}
      <AppBar />
    </>
  );
}
