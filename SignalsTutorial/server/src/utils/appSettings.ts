export const config = {
    db: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    },
    routes: {
      client: `/v1/client`,
      swagger: `/api-docs`
    },
    port: 3000
  };
  