import { z } from "zod";
import { $StudentRecord } from "./$StudentRecord";
import { $Tuition } from "./$Tuition";

const $Assessment = $StudentRecord.merge($Tuition).extend({
  year: z.string(),
  balance: z.coerce.number(),
  status: z.enum(["paid", "not paid"]),
});

export { $Assessment };
