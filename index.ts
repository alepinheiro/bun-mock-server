import { type BunRequest } from "bun";
import { Faker, pt_BR } from "@faker-js/faker";
import { z } from "zod";

const PORT = 3000;

const fakeData = new Faker({
  locale: [pt_BR],
});

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

const addCORSHeaders = (res: Response) => {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  return res;
};

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

const getQueryParams = (req: BunRequest) => {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams);
  const { page, pageSize } = QueryParamsSchema.parse(queryParams);
  return { page, pageSize };
};

const targetRoute = async (
  req: BunRequest<"/api/reports/daily-results/:page/:pageSize">
) => {
  const results = [];
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
      current_page: req.params.page ?? 1,
      per_page: req.params.pageSize ?? 30,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return addCORSHeaders(res);
};

const teamConversionResults = async (req: BunRequest) => {
  const results = [];
  const total = 4;
  while (results.length < total) {
    results.push({
      teamId: fakeData.string.uuid(),
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

const reportsKPIPerson = async (req: BunRequest<"/api/reports/kpi/person">) => {
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

Bun.serve({
  port: PORT,
  routes: {
    "/api/reports/daily-results/:page/:pageSize": targetRoute,
    "/api/reports/team-conversion-results": teamConversionResults,
    "/api/reports/kpi/person": reportsKPIPerson,
  },
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Mock server rodando em http://localhost:${PORT}`);
