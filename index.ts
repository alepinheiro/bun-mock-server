import { userDailyResults } from "@/routes/api/reports/user-daily-results";
import { reportsKPIPerson } from "@/routes/api/reports/kpi/person";
import { teamConversionResults } from "@/routes/api/reports/team-conversion-results";
import { authenticatedUser } from "@/routes/api/auth/authenticated-user";
import { dailyResults } from "@/routes/api/reports/daily-results";

const PORT = 3000;

Bun.serve({
  port: PORT,
  routes: {
    "/api/reports/daily-results": dailyResults,
    "/api/auth/authenticated-user": authenticatedUser,
    "/api/reports/user-daily-results": userDailyResults,
    "/api/reports/team-conversion-results": teamConversionResults,
    "/api/reports/kpi/person": reportsKPIPerson,
  },
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Mock server rodando em http://localhost:${PORT}`);
