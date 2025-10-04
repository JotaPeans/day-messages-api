export default {
  BETTER_AUTH_TRUSTED_ORIGINS: process.env.BETTER_AUTH_TRUSTED_ORIGINS!,
  CORS_ORIGIN: process.env.CORS_ORIGIN!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};
