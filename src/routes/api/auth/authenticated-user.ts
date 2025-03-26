import { addCORSHeaders } from "@/helpers/addCors";
import type { BunRequest } from "bun";

export const authenticatedUser = async (
  req: BunRequest<"/api/auth/authenticated-user">
) => {
  const res = new Response("OK");
  return addCORSHeaders(res);
};
