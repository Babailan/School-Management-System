import { z } from "zod";
import { _id } from "../helper/_id";

const TuitionSchema = z.object({
  miscellaneous: z.array(z.object({ name: z.string(), fee: z.string() })),
  tuition: z.string(),
  gradeLevel: z.string(),
  _id: _id,
});
export { TuitionSchema };
