export default {
  BETTER_AUTH_TRUSTED_ORIGINS: process.env.BETTER_AUTH_TRUSTED_ORIGINS!,
  CORS_ORIGIN: process.env.CORS_ORIGIN!,
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
}