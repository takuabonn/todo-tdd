import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  // pages: {
  //   signIn: ""
  // },

  callbacks: {
    async session({ session, user, token }) {
      console.log(session, user, token);
      // jwtが呼ばれた後に実行されます．
      return { ...session, ...token }; // JWTではuserは渡されません
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.access_token) token.access_token = account?.access_token;
      return token; // 初回の認証以降，tokenしか渡されません．
    },

    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl);
      return baseUrl;
    },
  },
});
