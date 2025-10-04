import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import { auth } from "./lib/auth";
import config from "./lib/config";
import { UserApp } from "./user";
import { MessagesApp } from "./messages";

const app = new Elysia()
  .use(
    cors({
      origin: config.CORS_ORIGIN.split(","),
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .mount(auth.handler)
  .group("/api", (group) => group.use(UserApp).use(MessagesApp))
  .listen({
    hostname: "0.0.0.0",
    port: config.PORT,
  });

export default app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
