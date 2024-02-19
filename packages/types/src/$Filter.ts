import z from "zod";
import { $_id } from "./$_id";
import { $Pagination } from "./$Pagination";
import { $Assessment } from "./$Assessment";
import { $StudentRecord } from "./$StudentRecord";
import { $StudentVerification } from "./$StudentVerification";
import { $Section } from ".";

const $Filter = z
  .object({
    limit: z.coerce.number().default(10),
    query: z.string({ required_error: "query parameter is missing" }),
    year: z.string(),
    _id: $_id,
  })
  .merge($Assessment)
  .merge($Pagination)
  .merge($StudentRecord)
  .merge($StudentVerification)
  .merge($Section);

export { $Filter };
