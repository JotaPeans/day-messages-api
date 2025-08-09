import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import { auth } from "./lib/auth";
import config from "./lib/config";
import { UserApp } from "./user";
import { MessagesApp } from "./messages";

const app = new Elysia()
  .use(
    cors({
      origin: config.CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .group("/api", (group) => group.use(UserApp).use(MessagesApp))
  .mount(auth.handler)
  .listen(config.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
