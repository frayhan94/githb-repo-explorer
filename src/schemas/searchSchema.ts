import { z } from "zod";
export const searchSchema = z.object({ query: z.string().min(3, "Enter at least 3 characters") });
export type SearchSchemaType = z.infer<typeof searchSchema>;
