import { NextRequest } from "next/server";
import { Connect } from "../../../../mongodb/connect";
import { ZodError, array, z } from "zod";
import { ObjectId, WithId } from "mongodb";
import {
  AssessmentSchema,
  StudentRecordSchema,
} from "@repo/database-zod-schema";
import { conformsTo } from "lodash";
import { helper } from "@repo/database-zod-schema";

export const GET = async (req: NextRequest, { params }) => {
  try {
    const db = (await Connect()).db("yasc");
    const assessmentCollection = db.collection("assessment");
    const studentRecordCollection = db.collection("student-record");
    let { _id } = params;

    helper._id.parse(_id);

    const result = await assessmentCollection.findOne({
      _id: new ObjectId(_id),
    });

    const parsedAssessment = AssessmentSchema.parse(result);
    const parsedStudentData = StudentRecordSchema.parse(result);

    return Response.json(
      Object.assign({}, parsedAssessment, parsedStudentData)
    );
  } catch (error) {
    console.log(error);
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
