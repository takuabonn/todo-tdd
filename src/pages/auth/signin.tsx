import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
const SignIn = () => {
  return (
    <div className="w-screen h-screen bg-sky-900 flex justify-center items-center">
      <Image
        src={"/btn_google_signin_light_normal_web@2x.png"}
        alt=""
        width={300}
        height={500}
        onClick={() => signIn("google")}
        className="cursor-pointer"
      />
    </div>
  );
};

export default SignIn;
