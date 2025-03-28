import { addCORSHeaders } from "@/helpers/addCors";
import { fakeData } from "@/helpers/faker";
import type { BunRequest } from "bun";

export const teamConversionResults = async (req: BunRequest) => {
  const results = [];
  const total = 4;
  while (results.length < total) {
    results.push({
      teamId: fakeData.string.uuid(),
      teamName: fakeData.lorem.word(),
      teamColor: fakeData.color.rgb(),
      conversion: fakeData.number.int({ min: 0, max: 100 }),
      approvedTotal: fakeData.number.int({ min: 0, max: 500 }),
      effectiveTotal: fakeData.number.int({ min: 0, max: 500 }),
      foldersTotal: fakeData.number.int({ min: 0, max: 500 }),
      leadsTotal: fakeData.number.int({ min: 0, max: 500 }),
    });
  }
  const res = new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
  return addCORSHeaders(res);
};
