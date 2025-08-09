import { authPlugin } from "@/auth";
import { Elysia, t } from "elysia";
import { MessagesService } from "./service";

export const MessagesApp = new Elysia({ name: "MessagesApp" })
  .use(authPlugin)
  .get(
    "/messages",
    ({ user, query }) => {
      return MessagesService.getMessages({
        userToId: user.id,
        page: query.page,
      });
    },
    { auth: true, query: t.Object({ page: t.Number() }) }
  )
  .post(
    "/messages",
    async ({ user, body }) => {
      return await MessagesService.createMessage({
        userFromId: user.id,
        userToId: body.userToId,
        message: body.message,
      });
    },
    {
      auth: true,
      body: t.Object({
        userToId: t.String(),
        message: t.String(),
      }),
    }
  )
  .patch(
    "/messages/:id",
    async ({ user, body, params }) => {
      return await MessagesService.updateMessage({
        id: params.id,
        liked: body.liked,
      });
    },
    {
      auth: true,
      body: t.Object({
        liked: t.Boolean(),
      }),
      params: t.Object({
        id: t.String(),
      }),
    }
  );
