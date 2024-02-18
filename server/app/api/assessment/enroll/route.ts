import { NextRequest } from "next/server";
import { Connect } from "../../../../mongodb/connect";
import { ObjectId } from "mongodb";
import { $Assessment, $Filter, $_id } from "yasci-types";
import z from "zod";
import { $Section } from "yasci-types";
import _ from "lodash";

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const assessmentCollection = (await Connect())
      .db("yasc")
      .collection("assessment");
    const sectionCollection = (await Connect())
      .db("yasc")
      .collection("assessment");

    const { _id, section_id } = $Filter
      .extend({
        section_id: z.string(),
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
      .extend({ _id: z.string() })
      .partial()
      .parse(targetAssessment);
    const sectionResult = $Section
      .extend({ _id: z.string() })
      .partial()
      .parse(targetSection);

    const existingInSection = _.find(sectionResult.students, {
      studentId: assessmentResult.studentId,
    });
    return Response.json("Hallo");
  } catch (err) {
    console.log(err instanceof z.ZodError);
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
