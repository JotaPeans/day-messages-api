import { auth } from "@/lib/auth";
import Elysia from "elysia";

export const authPlugin = new Elysia({ name: "authPlugin" }).macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      });

      if (!session) return status(401);

      return {
        user: session.user,
        session: session.session,
      };
    },
  },
});
