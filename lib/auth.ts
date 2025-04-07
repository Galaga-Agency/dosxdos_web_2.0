import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;

        const expectedUsername =
          process.env.ADMIN_USERNAME || "dosxdos";
        const expectedPassword =
          process.env.ADMIN_PASSWORD || "dosxdos2025*";

        if (username === expectedUsername && password === expectedPassword) {
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
