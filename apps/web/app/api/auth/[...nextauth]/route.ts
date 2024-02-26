import { connectToMongo } from "@/libs/mongodb/connect";
import Joi from "joi";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        if (user) {
          return { id: "1", name: "J Smith", email: "jsmith@example.com" };
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
