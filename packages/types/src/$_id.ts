import { ObjectId } from "mongodb";
import { z } from "zod";

const $_id = z
  .string()
  .refine((id) => ObjectId.isValid(id), { message: "Not a valid ID" });

export { $_id };
