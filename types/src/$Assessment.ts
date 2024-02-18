import { z } from "zod";
import { $StudentRecord } from "./$StudentRecord";
import { $Tuition } from "./$Tuition";

const $Assessment = $StudentRecord.merge($Tuition.partial()).extend({
  year: z.string(),
  balance: z.number({ required_error: "Balance is required" }).optional(),
  status: z.enum(["paid", "not paid"]).optional(),
  history: z
    .array(z.object({ date: z.coerce.date(), amount: z.number() }))
    .optional(),
  enroll: z.enum(["enrolled", "not enrolled"]).optional(),
});

export { $Assessment };
