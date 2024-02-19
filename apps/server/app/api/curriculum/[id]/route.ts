import { ObjectId } from "mongodb";
import { Connect } from "../../../../mongodb/connect";
import _ from "lodash";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const curriculum_collection = (await Connect())
      .db("yasc")
      .collection("curriculum");

    // Find the curriculum based on year and gradeLevel
    const curriculum = await curriculum_collection.findOne({
      _id: new ObjectId(params.id),
    });
    if (!curriculum) {
      return Response.json(
        {},
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }
    return Response.json(curriculum, {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
export const PUT = async (req: Request) => {
  try {
    const { id, data } = await req.json();
    const curriculum_collection = (await Connect())
      .db("yasc")
      .collection("curriculum");

    delete data["_id"];
    const update = await curriculum_collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    if (update.acknowledged) {
      return Response.json("Successful");
    }
  } catch (error) {
    console.log(error);
    return Response.error();
  }
};

// For preflight options
export const OPTIONS = async (req: Request) => {
  return Response.json({}, { status: 200 });
};
