import { NextRequest } from "next/server";
import { Connect } from "../../../../mongodb/connect";
import { ObjectId } from "mongodb";
import { $Assessment, $Filter } from "yasci-types";
import { ZodError } from "zod";

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const assessmentCollection = (await Connect())
      .db("yasc")
      .collection("assessment");

    const { balance, _id } = $Filter
      .pick({ balance: true, _id: true })
      .required({ balance: true, _id: true })
      .parse(body);

    const target = await assessmentCollection.findOne({
      _id: new ObjectId(_id),
    });

    const result = $Assessment.partial().parse(target);

    const newBalance = (result.balance || 0) + (balance || 0);
    const totalTuition =
      (result.miscellaneous?.reduce((p, c) => Number(p) + Number(c.fee), 0) ||
        0) + Number(result?.tuition || 0);
    const newStatus = newBalance >= totalTuition ? "paid" : "not paid";
    const updatedVersion = $Assessment
      .pick({ balance: true, status: true })
      .parse({ balance: newBalance, status: newStatus });

    if (result) {
      const updated = await assessmentCollection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: updatedVersion,
          $push: {
            history: { amount: Number(balance || 0), date: new Date() },
          },
        }
      );
      if (updated.acknowledged) {
        return Response.json("Successfully updated balance");
      }
    }

    return Response.json("");
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(error.issues, { status: 400 });
    }
    return Response.error();
  }
};
// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
