import { z } from "zod";

const $Pagination = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  query: z.coerce.string().default(""),
});

export { $Pagination };
