import { NextRequest } from "next/server";
import { Connect } from "../../../../mongodb/connect";
import { ZodError, z } from "zod";
import { ObjectId } from "mongodb";
import { $Assessment, $Pagination, $_id } from "yasci-types";

export const GET = async (req: NextRequest, { params }) => {
  try {
    const assessmentCollection = (await Connect())
      .db("yasc")
      .collection("assessment");
    let { id } = params;
    id = $_id.parse(id);
    const result = await assessmentCollection.findOne({
      _id: new ObjectId($_id.parse(id)),
    });

    const parsedResult = $Assessment.partial().nullable().parse(result);
    return Response.json(parsedResult);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(error.issues, { status: 400 });
    }
    if (error instanceof Error) {
      return Response.json(error.message, { status: 500 });
    }
    return Response.json(error, { status: 500 });
  }
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
