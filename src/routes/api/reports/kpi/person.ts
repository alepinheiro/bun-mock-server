import { addCORSHeaders } from "@/helpers/addCors";
import { fakeData } from "@/helpers/faker";
import { getQueryParams } from "@/helpers/getQueryParams";
import type { BunRequest } from "bun";

const createPerson = () => ({
  id: fakeData.string.uuid(),
  photo: fakeData.image.avatar(),
  name: fakeData.person.fullName(),
});

const createKPI = () => ({
  target: fakeData.number.float({
    min: 600 * 1000,
    max: 1500 * 1000,
    multipleOf: 1000,
  }),
  current: fakeData.number.float({
    min: 100 * 1000,
    max: 500 * 1000,
    multipleOf: 1000,
  }),
  nps: fakeData.number.int({ min: 0, max: 100 }),
});

export const reportsKPIPerson = async (
  req: BunRequest<"/api/reports/kpi/person">
) => {
  const { page, pageSize } = getQueryParams(req);

  const results = [];

  const total = 100;

  while (results.length < total) {
    results.push({
      person: createPerson(),
      kpi: createKPI(),
    });
  }

  const res = Response.json(
    {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize),
      data: results.slice(0, pageSize),
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  //adicionar um delay de 1s
  await new Promise((resolve) => setTimeout(resolve, 1 * 1000));

  return addCORSHeaders(res);
};
