import { NextRequest } from "next/server";
import { Connect } from "../../../mongodb/connect";
import { ZodError } from "zod";
import {
  AssessmentSchema,
  StudentRecordSchema,
  StudentVerificationSchema,
  TuitionSchema,
} from "@repo/database-zod-schema";
import _ from "lodash";
import { ObjectId } from "mongodb";

/**
 * @remarks
 *  PUT METHOD deletes the user and append him into as official students.
 */
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

    const result = await studentVerificationCollection.findOne({
      _id: new ObjectId(_id),
    });

    if (result == null) throw new Error("ID not found");

    let getTheLatestStudentID = await studentRecordCollection
      .find({})
      .sort({ studentId: -1 })
      .limit(1)
      .toArray();

    const tuitionResult = await tuitionCollection.findOne({
      gradeLevel: result?.gradeLevel,
    });

    const studentRecord = StudentRecordSchema.omit({ _id: true }).parse({
      ...result,
      studentId: getTheLatestStudentID[0]?.studentId + 2 || 5000,
    });

    const studentVerification = StudentVerificationSchema.omit({
      _id: true,
    }).parse(result);

    const tuition = TuitionSchema.omit({ _id: true }).parse(tuitionResult);
    const assessment = AssessmentSchema.omit({ _id: true }).parse(
      _.merge(tuition, studentRecord, {
        year: studentVerification.year,
      })
    );

    const deletedVerification = await studentVerificationCollection.deleteOne({
      _id: new ObjectId(_id),
    });

    if (deletedVerification.acknowledged) {
      const insertedRecord = await studentRecordCollection.insertOne(
        studentRecord
      );

      if (insertedRecord.acknowledged) {
        const insertedAssessment = await assessmentCollection.insertOne(
          assessment
        );

        if (insertedAssessment.acknowledged) {
          return Response.json(
            { message: "Record and Assessment inserted successfully" },
            { status: 200 }
          );
        } else {
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
      return Response.json(
        { message: "Failed to delete student verification" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return Response.json(error.issues, { status: 400 });
    }
    return Response.json("Internal Server Error", { status: 500 });
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
