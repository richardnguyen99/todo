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
                  id
                  username
                  email
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
          id: data.login.id,
          email: data.login.email,
          username: data.login.username,
          accessToken: data.login.accessToken,
          refreshToken: data.login.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    // Pass User Info to JWT and Session. Content of Jwt callback can be passed
    // to Session callback. The rest will remain hidden from the client.
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refershToken = (user as any).refreshToken;
        token.id = (user as any).id;
        token.email = (user as any).email;
        token.username = (user as any).username;
      }

      return token;
    },

    // Pass User Info to session so that Next components can access it.
    // Server components can access through getServerSession(auth).
    // Client components can access through useSession().
    // https://next-auth.js.org/getting-started/client#usesession
    session: async ({ session, token, user }) => {
      (session as any).user.accessToken = token.accessToken;
      (session as any).user.id = token.id;
      (session as any).user.username = token.username;

      return {
        ...session,
        ...user,
      };
    },
  },
};

export default options;
