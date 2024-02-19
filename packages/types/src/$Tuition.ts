import { z } from "zod";

const $Tuition = z.object({
  miscellaneous: z.array(z.object({ name: z.string(), fee: z.string() })),
  tuition: z.string(),
  gradeLevel: z.string(),
});
export { $Tuition };
