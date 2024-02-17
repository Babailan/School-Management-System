import { NextRequest } from "next/server";
import { Connect } from "../../../mongodb/connect";
import { $Assessment, $_id } from "../../../types";
import { ObjectId } from "mongodb";

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
export const PUT = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const assessmentCollection = (await Connect())
      .db("yasc")
      .collection("assessment");

    const _id = $_id.parse(data._id);
    const updatedVersion = $Assessment.partial().parse(data);

    const target = await assessmentCollection.findOne({
      _id: new ObjectId(_id),
    });

    const result = $Assessment.partial().parse(target);

    if (result) {
      // update balance
      updatedVersion.balance =
        (result.balance || 0) + (updatedVersion.balance || 0);
      const totalTuition =
        (result.miscellaneous?.reduce((p, c) => Number(p) + Number(c.fee), 0) ||
          0) + Number(result?.tuition || 0);

      if (updatedVersion.balance >= totalTuition) {
        updatedVersion.status = "paid";
      } else {
        updatedVersion.status = "not paid";
      }
      console.log(updatedVersion);
      const updated = await assessmentCollection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updatedVersion }
      );
      if (updated.acknowledged) {
        return Response.json("Successfully updated balance");
      }
    }

    return Response.json("");
  } catch (error) {
    return Response.error();
  }
};
// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
