import type { BunRequest } from "bun";
import { fakeData } from "@/helpers/faker";
import { addCORSHeaders } from "@/helpers/addCors";
import { getQueryParams } from "@/helpers/getQueryParams";

export const dailyResults = async (
  req: BunRequest<"/api/reports/daily-results">
) => {
  const results = [];
  const { page, pageSize } = getQueryParams(req);
  const total = 100;

  while (results.length < total) {
    results.push({
      id: fakeData.string.uuid(),
      name: fakeData.person.fullName(),
      leads: fakeData.number.int({ min: 0, max: 1000 }),
      totalValue: fakeData.number.float({ min: 1000, max: 100000 }),
      userId: fakeData.string.uuid(),
      approvedFolders: {
        value: fakeData.number.float({ min: 1000, max: 50000 }),
        quantity: fakeData.number.int({ min: 1, max: 100 }),
        conversion: fakeData.number.float({ min: 0, max: 100 }),
      },
      effectiveFolders: {
        value: fakeData.number.float({ min: 500, max: 40000 }),
        quantity: fakeData.number.int({ min: 1, max: 100 }),
        conversion: fakeData.number.float({ min: 0, max: 100 }),
      },
      targetProgress: fakeData.number.float({ min: 0, max: 100 }),
    });
  }
  const res = new Response(
    JSON.stringify({
      total,
      data: results,
      current_page: page ?? 1,
      per_page: pageSize ?? 30,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return addCORSHeaders(res);
};
