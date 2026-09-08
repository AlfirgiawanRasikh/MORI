import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

// Test-only static server for the real production export. Never bind publicly.
const root = path.resolve("out");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};
createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");
    let file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(4173, "127.0.0.1", () =>
  console.log("MORI test preview: http://127.0.0.1:4173"),
);
