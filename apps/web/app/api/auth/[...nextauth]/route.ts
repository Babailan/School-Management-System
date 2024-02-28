import { PagesOptions } from "@/config/AuthOptions";
import { connectToMongo } from "@/libs/mongodb/connect";
import Joi from "joi";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const login = async (email, password) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required ",
      "string.required": "Email is required",
      "string.email": "Email is invalid.",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
    }),
  });

  const { value, error } = schema.validate({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  const userAccountCollection = (await connectToMongo())
    .db("yasc")
    .collection("user_account");
  const user = await userAccountCollection.findOne({ email, password });
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  {
    const { password, ...userInformation } = user;
    return userInformation;
  }
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const result = await login(credentials?.email, credentials?.password);
        return {
          id: result._id.toString(),
          email: result.email,
          name: result.firstName,
        };
      },
    }),
  ],
  pages: PagesOptions,
});

export { handler as GET, handler as POST };
