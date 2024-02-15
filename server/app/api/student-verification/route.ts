import { NextRequest } from "next/server";
import { Connect } from "../../../mongodb/connect";
import { ZodCustomIssue, ZodError, z } from "zod";
import {
  $StudentRecord,
  $StudentVerification,
  $_id,
} from "../../../types/global";
import _ from "lodash";
import { ObjectId } from "mongodb";

export const PUT = async (req: NextRequest) => {
  try {
    const dbConnection = (await Connect()).db("yasc");
    const { _id } = await req.json();

    const tuitionCollection = dbConnection.collection("tuition");
    const studentVerificationCollection = dbConnection.collection(
      "student-verification"
    );
    const assessmentCollection = dbConnection.collection("assessment");
    const studentRecordCollection = dbConnection.collection("student-record");

    const $VerificationSchema = $StudentVerification.extend({
      _id: $_id,
    });

    const result = await studentVerificationCollection.findOne<
      z.infer<typeof $VerificationSchema>
    >({
      _id: new ObjectId($_id.parse(_id)),
    });

    if (result == null) throw new Error("ID not found");

    let getTheLatestStudentID = await studentRecordCollection
      .find({})
      .sort({ studentId: -1 })
      .limit(1)
      .toArray();
    const studentRecord = $StudentRecord.parse({
      ...result,
      studentId: getTheLatestStudentID[0]?.studentId + 2 || 5000,
    });

    const tuitionResult = await tuitionCollection.findOne({
      gradeLevel: result?.gradeLevel,
    });

    const tuitionSchema = z.object({
      miscellaneous: z
        .array(z.object({ name: z.string(), fee: z.string() }))
        .default([]),
      tuition: z.string().default(""),
      gradeLevel: z.string().default(""),
    });
    const tuition = tuitionSchema.safeParse(tuitionResult);

    const deletedVerification = await studentVerificationCollection.deleteOne({
      _id: new ObjectId($_id.parse(_id)),
    });

    if (deletedVerification.acknowledged) {
      const insertedRecord = await studentRecordCollection.insertOne(
        studentRecord
      );

      if (insertedRecord.acknowledged) {
        const assessment = {
          ...studentRecord,
          tuition: _.get(tuition, "data", {}),
        };
        const insertedAssessment = await assessmentCollection.insertOne(
          assessment
        );

        if (insertedAssessment.acknowledged) {
          // Successfully inserted student record and assessment
          return Response.json(
            { message: "Record and Assessment inserted successfully" },
            { status: 200 }
          );
        } else {
          // Failed to insert assessment
          return Response.json(
            { message: "Failed to insert assessment" },
            { status: 500 }
          );
        }
      } else {
        return Response.json(
          { message: "Failed to insert student record" },
          { status: 500 }
        );
      }
    } else {
      // Failed to delete student verification
      return Response.json(
        { message: "Failed to delete student verification" },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(error.issues, { status: 403 });
    }
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    return Response.json("");
  } catch (error) {}
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
