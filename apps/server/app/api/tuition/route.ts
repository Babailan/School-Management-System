import { NextRequest } from "next/server";
import { Connect } from "../../../mongodb/connect";

export const POST = async (req: NextRequest) => {
  try {
    const { data, gradeLevel } = await req.json();

    const tuition_collection = (await Connect())
      .db("yasc")
      .collection("tuition");
    const exist = await tuition_collection.findOne({
      gradeLevel: gradeLevel,
    });
    if (exist) {
      const result = await tuition_collection.updateOne(exist, { $set: data });
      if (result.acknowledged) {
        return Response.json("Updated");
      }
    } else {
      const result = await tuition_collection.insertOne({
        ...data,
        gradeLevel,
      });
      if (result.acknowledged) {
        return Response.json("Inserted");
      }
    }
  } catch (error) {
    return Response.error();
  }
};
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
