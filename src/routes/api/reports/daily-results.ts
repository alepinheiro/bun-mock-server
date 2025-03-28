import type { BunRequest } from "bun";
import { fakeData } from "@/helpers/faker";
import { addCORSHeaders } from "@/helpers/addCors";
import { getQueryParams } from "@/helpers/getQueryParams";

export const dailyResults = async (
  req: BunRequest<"/api/reports/daily-results">
) => {
  const results = [];
  const { page, pageSize } = getQueryParams(req);

  const TOTAL_ITEMS = 100;

  while (results.length < TOTAL_ITEMS) {
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

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const paginatedResults = results.slice(startIndex, endIndex);

  const res = new Response(
    JSON.stringify({
      data: paginatedResults,
      total: TOTAL_ITEMS,
      currentPage: page,
      perPage: pageSize,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return addCORSHeaders(res);
};
