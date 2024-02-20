import { NextRequest } from "next/server";
import { Connect } from "../../../mongodb/connect";
import { ObjectId } from "mongodb";
import { ZodError } from "zod";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const { gradeLevel } = Object.fromEntries(searchParams.entries());

    if (!gradeLevel) {
      return Response.json("Missing Required Field", { status: 409 });
    }
    const tuition_collection = (await Connect())
      .db("yasc")
      .collection("tuition");
    const tuition = await tuition_collection.findOne({ gradeLevel });

    console.log(tuition);
    return Response.json(
      tuition || {
        miscellaneous: [],
        tuition: "",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.error();
  }
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
