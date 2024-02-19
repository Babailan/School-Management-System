import { z } from "zod";

const $Grade = z.object({
  w1: z.number(),
  w2: z.number(),
  w4: z.number(),
  w5: z.number(),
  w6: z.number(),
  w7: z.number(),
  w8: z.number(),
  w9: z.number(),
  w10: z.number(),
  p1: z.number(),
  p2: z.number(),
  p3: z.number(),
  p4: z.number(),
  p5: z.number(),
  p6: z.number(),
  p7: z.number(),
  p8: z.number(),
  p9: z.number(),
  p10: z.number(),
  q: z.number(),
});

export { $Grade };
