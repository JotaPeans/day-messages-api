import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import config from "./config";
import { db } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "mongodb",
  }),
  advanced: {
    database: {
      generateId: false,
    },
    cookies: {
      session_token: {
        name: "session_token",
        attributes: {
          sameSite: "None",
        },
      },
    },
  },
  user: {
    additionalFields: {
      image: {
        type: "string",
        defaultValue: "https://cdn-icons-png.flaticon.com/512/8207/8207765.png",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  trustedOrigins: config.BETTER_AUTH_TRUSTED_ORIGINS?.split(",") ?? [],
});
