import { z } from "zod";

const $_id = z.string().min(0);

export { $_id };
