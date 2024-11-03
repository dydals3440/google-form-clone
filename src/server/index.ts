import express from "express";

import { createServer as createViteServer } from "vite";
import surveyRouter from "./api/survey";

async function startServer() {
  const app = express();
  const port = 5173;

  app.use(express.json());
  app.use("/api/surveys", surveyRouter);

  const vite = await createViteServer({
    // express middle ware 등록
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  return app.listen(port);
}

// 서버 시작
const server = await startServer();

// 충돌 방지
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeFullReload", () => {
    server.close();
  });

  import.meta.hot.dispose(() => {
    server.close();
  });
}
