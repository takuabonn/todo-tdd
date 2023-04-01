import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { DropDown } from "./DropDown";
import { MdAccountCircle } from "react-icons/md";
export const AppBar = () => {
  return (
    <div className="flex">
      <div className="w-screen h-16 bg-sky-900 text-4xl pl-5 py-2 text-white">
        TODO
      </div>
      <DropDown
        buttonComponent={
          <MdAccountCircle size="4rem" className="py-1 text-white" />
        }
        dropdownPositionClass="right-5 py-1 "
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <div
              className="text-md font-yuji pt-3 pb-3 mr-5 px-1"
              onClick={() => signOut()}
            >
              ログアウト
            </div>
          </li>
        </ul>
      </DropDown>
    </div>
  );
};
