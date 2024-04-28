export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { connectDB } = await import("@/lib/helpers/connectDb");
    const { hashPassword } = await import("@/lib/crypto/password");
    const userCollection = await connectDB();
    const result = userCollection
      .collection("user-account")
      .findOne({ type: "root" });
    if (!result) {
      const defaultAccount = {
        email: "",
        roles: ["administrator"],
        username: "administrator",
        type: "root",
        password: await hashPassword("administrator"),
      };
      await userCollection.collection("user-account").insertOne(defaultAccount);
    }
  }
};
