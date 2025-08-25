// app/lib/auth.js
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Find user in DB
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // 2. Verify password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password // stored hashed password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        // 3. Return user (must have at least `id` and `email`)
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
};
