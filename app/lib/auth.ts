import { cookies } from "next/headers";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials || !credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const res = await fetch("http://localhost:4444/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `#graphql
              mutation LoginUser($input: LoginInput!) {
                login(input: $input) {
                  accessToken
                  refreshToken
                  message
                  status
                }
              }
            `,
            variables: {
              input: {
                email: credentials.email,
                password: credentials.password,
              },
            },
          }),

          credentials: "include",
        });

        const { data } = await res.json();
        console.log(data);

        if (!res.ok || data.login.status !== 200) {
          throw new Error(`LoginFailed: ${data.login.message}`);
        }

        return {
          id: "23",
          name: "Tom Riddle",
          email: "triddle@hogwarts.com",
          access_token: data.login.accessToken,
          refresh_token: data.login.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = (user as any).accessToken;
        // @ts-ignore
        token.refershToken = (user as any).refreshToken;
      }

      return token;
    },

    session: async ({ session, token }) => {
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;

      return session;
    },
  },
};

export default options;
