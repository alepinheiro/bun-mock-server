import { z } from "zod";
import type { BunRequest } from "bun";

const QueryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  pageSize: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 30)),
});

export const getQueryParams = (req: BunRequest) => {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams);
  const { page, pageSize } = QueryParamsSchema.parse(queryParams);
  return { page, pageSize };
};
