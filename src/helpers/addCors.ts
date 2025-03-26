/**
 * Adiciona headers de CORS à resposta
 * @param res
 * @returns
 */
export const addCORSHeaders = (res: Response) => {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  return res;
};
