import { NextRequest } from "next/server";
import { Connect } from "../../../../mongodb/connect";
import { Document, ObjectId, WithId } from "mongodb";
import { $Assessment, $Filter, $StudentRecord, $_id } from "@repo/types";
import z from "zod";
import { $Section } from "@repo/types";
import _ from "lodash";

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const assessmentCollection = (await Connect())
      .db("yasc")
      .collection<WithId<typeof $Assessment._type>>("assessment");
    const sectionCollection = (await Connect())
      .db("yasc")
      .collection("section");

    const { _id, section_id } = $Filter
      .extend({
        section_id: $_id,
      })
      .pick({ _id: true, section_id: true })
      .required()
      .parse(body);

    const targetAssessment = await assessmentCollection.findOne({
      _id: new ObjectId(_id),
    });

    const targetSection = await sectionCollection.findOne({
      _id: new ObjectId(section_id),
    });

    const assessmentResult = $Assessment
      .extend({ _id: $_id })
      .partial()
      .parse(JSON.parse(JSON.stringify(targetAssessment)));

    const studentRecord = $StudentRecord.parse(assessmentResult);

    const sectionResult = $Section
      .extend({ _id: z.string() })
      .partial()
      .parse(JSON.parse(JSON.stringify(targetSection)));

    const existingInSection = _.find(sectionResult.students, {
      studentId: assessmentResult.studentId,
    });

    if (existingInSection) {
      const error = new z.ZodError([]);
      error.addIssue({
        code: "custom",
        path: [],
        message: "Student already exist in this room",
      });
      throw error;
    }

    const sectionAdded = await sectionCollection.updateOne(
      { _id: new ObjectId(sectionResult._id) },
      {
        $push: {
          students: assessmentResult,
        },
      }
    );
    if (sectionAdded.acknowledged) {
      assessmentCollection.updateOne(
        {
          _id: new ObjectId(assessmentResult._id),
        },
        {
          $set: {
            enrollment_status: true,
          },
        }
      );
    }

    return Response.json("Hallo");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json(err.issues, { status: 400 });
    }

    return Response.json("Internal Server Error", { status: 500 });
  }
};
// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
