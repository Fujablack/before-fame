// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./src/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Find user in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        if (!user) return null;

        // 2. Check if password matches
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordsMatch) return null;

        // 3. Return user object (NextAuth handles the session)
        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  pages: {
    signIn: "/login", // Tell NextAuth to use YOUR custom login page
  },
  session: {
    strategy: "jwt", // Store session in a secure cookie
  }
})