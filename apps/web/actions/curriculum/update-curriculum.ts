"use server";
import { arrayOfIdToDocument } from "@/libs/helpers/arrayOfIdToDocument";
import connectDB from "@/libs/helpers/connectDb";
import { Strand } from "@/libs/helpers/strand";
import Joi from "joi";
import { ObjectId } from "mongodb";

export interface UpdateStrandSubjectActionParams {
  remove: string[];
  add: string[];
  strand: string;
  id: string;
}
export async function UpdateStrandSubjectAction({
  remove,
  add,
  strand,
  id,
}: UpdateStrandSubjectActionParams) {
  const db = (await connectDB()).db("yasc");
  const curriculumCollection = db.collection("curriculum");
  const filterSchema = Joi.object({
    remove: Joi.array().items(Joi.string()),
    add: Joi.array().items(Joi.string()),
    strand: Joi.string()
      .valid(...Object.keys(Strand))
      .required(),
    id: Joi.string().required(),
  });
  const { error, value } = filterSchema.validate({ remove, add, strand, id });
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  try {
    const removeObjectId = value.remove.map((id) => new ObjectId(id));

    if (removeObjectId.length > 0) {
      await curriculumCollection.updateOne(
        {
          _id: new ObjectId(value.id),
        },
        {
          $pull: {
            [strand]: {
              _id: {
                $in: removeObjectId,
              },
            },
          },
        }
      );
    }
    if (value.add.length > 0) {
      const addedSubjects = await arrayOfIdToDocument(value.add, "subjects");

      await curriculumCollection.updateOne(
        {
          _id: new ObjectId(value.id),
        },
        {
          $addToSet: {
            [strand]: {
              $each: addedSubjects,
            },
          },
        }
      );
    }
    return {
      success: true,
      message: "Strand Subject Updated",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "Failed to update curriculum data",
    };
  }
}
