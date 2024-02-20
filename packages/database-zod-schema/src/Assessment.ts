import { z } from "zod";
import { StudentRecordSchema } from "./StudentRecord";
import { TuitionSchema } from "./Tuition";
import { _id } from "../helper/_id";

const AssessmentSchema = z
  .object({
    year: z.string(),
    balance: z.number().default(0),
    assessment_status: z.boolean().default(false),
    history: z
      .array(z.object({ date: z.coerce.date(), amount: z.number() }))
      .default([]),
    enrollment_status: z.boolean().default(false),
    _id: _id,
  })
  .merge(TuitionSchema.pick({ miscellaneous: true, tuition: true }))
  .merge(StudentRecordSchema.pick({ studentId: true }));

export { AssessmentSchema };
