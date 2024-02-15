import { NextRequest } from "next/server";
import { Connect } from "../../../mongodb/connect";
import { ZodError, ZodIssueCode, z, ZodIssue } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const { roles, username, password, email, firstname, lastname } =
      await req.json();

    const schema = z.object({
      roles: z.array(
        z.enum(["registrar", "cashier", "faculty", "administrator"])
      ),
      email: z.string().email(),
      password: z
        .string()
        .min(7, { message: "Password must contain at least 7 character(s)" }),
      firstname: z.string({ required_error: "First name is required" }),
      lastname: z.string({ required_error: "Last name is required" }),
      test: z.string(),
    });

    const sectionCollection = (await Connect())
      .db("yasc")
      .collection("account");
    const parseData = schema.parse({
      roles,
      email,
      password,
      lastname,
      firstname,
    });

    // const existingSection = await sectionCollection.findOne({
    //   year: parseData.year,
    //   sectionName: parseData.sectionName,
    // });

    // if (existingSection) {
    //   throw new ZodError([
    //     {
    //       code: "custom",
    //       path: [],
    //       message: "Section already exists for this year.",
    //     },
    //   ]);
    // }

    // await sectionCollection.insertOne(parseData);

    return Response.json({ message: "Section successfully added." });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(error.issues, { status: 403 });
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
