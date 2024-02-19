import { Connect } from "../../../mongodb/connect";

const headers = { "Access-Control-Allow-Origin": "*" };

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    console.log(email, password);
    const accountCollection = (await Connect())
      .db("yasc")
      .collection("user_account");

    const exist = await accountCollection.findOne({ email });

    if (exist) {
      if (password === exist.password) {
        delete exist["password"];
        return Response.json(
          {
            success: true,
            message: "Successfully Login",
            data: exist,
          },
          { headers }
        );
      } else {
        return Response.json(
          {
            success: false,
            message: "Wrong password",
            data: {},
          },
          { headers }
        );
      }
    } else {
      return Response.json(
        {
          success: false,
          message: "Email not found",
          data: {},
        },
        { headers }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
        data: {},
      },
      { headers }
    );
  }
};
