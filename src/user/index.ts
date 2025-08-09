import { Elysia } from "elysia";

import { authPlugin } from "@/auth";
import { db } from "@/lib/db";

export const UserApp = new Elysia().use(authPlugin).get(
  "/relationship",
  async ({ user }) => {
    return await db.userRelationship.findFirst({
      where: {
        userRelationShip: {
          id: user.id,
        }
      },
      include: {
        relatedUser: true
      }
    })
  },
  { auth: true }
);
