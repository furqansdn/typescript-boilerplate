import dotenv from 'dotenv';

dotenv.config();

export default {
  port: parseInt(process.env.APP_PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database using mongodb
  databaseUrl: process.env.DATABASE_URL!,
  databaseUser: process.env.DATABASE_USER || 'username',
  databasePass: process.env.DATABASE_PASS || 'password',

  api: {
    prefix: '/api',
  },

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET!,
    expires: process.env.JWT_EXPIRES_IN!,
    cookie: process.env.JWT_COOKIE_EXPIRES_IN!,
  },
};
