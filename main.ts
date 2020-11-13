import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import router from "./routes.ts";
import notFound from "./404.ts";

const env = config();

const app = new Application();
const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 8000;

console.log(`running at ${PORT}`);

app.use(router.routes());

app.use(notFound);

await app.listen({ port: PORT });
