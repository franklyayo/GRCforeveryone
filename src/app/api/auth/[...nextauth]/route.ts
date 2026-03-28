// src/app/api/auth/[...nextauth]/route.ts

export const dynamic = "force-dynamic"; // <-- Add this line
import clientPromise from "@/lib/mongoClient";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongoClient";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    // We can leave this blank for now to use NextAuth's default login page
  }
});

export { handler as GET, handler as POST };
