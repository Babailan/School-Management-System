import { NextRequest } from "next/server";
import { Connect } from "../../../mongodb/connect";
import { ZodError } from "zod";
import {
  $Tuition,
  $Assessment,
  $StudentRecord,
  $StudentVerification,
  $_id,
} from "yasci-types";
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

    const result = await studentVerificationCollection.findOne({
      _id: new ObjectId($_id.parse(_id)),
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

    const studentRecord = $StudentRecord.partial().parse({
      ...result,
      studentId: getTheLatestStudentID[0]?.studentId + 2 || 5000,
    });
    const studentVerification = $StudentVerification.parse(result);

    const tuition = $Tuition.partial().parse(tuitionResult);
    const assessment = $Assessment.partial().parse(
      _.merge(tuition, studentRecord, {
        year: studentVerification.year,
      })
    );

    const deletedVerification = await studentVerificationCollection.deleteOne({
      _id: new ObjectId($_id.parse(_id)),
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
