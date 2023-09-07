import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const user = {
          id: "24",
          name: "Tom Riddle",
          email: "triddle@hogwarts.com",
          password: "hogwarts",
        };

        if (
          user.email === credentials?.email &&
          user.password === credentials?.password
        ) {
          return user;
        }

        return null;
      },
    }),
  ],
};

export default options;
