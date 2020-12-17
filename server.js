const express = require("express");
const { join } = require("path");
const { parse } = require("url");
const { createReadStream } = require('fs');
const next = require("next");
const nextI18NextMiddleware = require("next-i18next/middleware").default;
const nextI18next = require("./i18n");

const PORT = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();
  server.use(nextI18NextMiddleware(nextI18next));

  server.get("/service-worker.js", (req, res) => {
    // const filePath = join(__dirname, ".next", "service-worker.js");
    const filePath = join(__dirname, "public", "sw.js");
    app.serveStatic(req, res, filePath);
  });

  server.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/sw.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('public/sw.js').pipe(res);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
})();
