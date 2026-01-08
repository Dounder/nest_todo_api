import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  PORT: number;
  STAGE: 'dev' | 'prod' | 'staging';
  PG_USER: string;
  PG_PASSWORD: string;
  PG_DB: string;
  DATABASE_URL: string;
  PGADMIN_EMAIL: string;
  PGADMIN_PASSWORD: string;
  SESSION_SECRET: string;
  SESSION_COOKIE_NAME: string;
  SESSION_COOKIE_MAX_AGE: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().default(3000),
    STAGE: joi.string().valid('dev', 'prod', 'staging').default('dev'),
    PG_USER: joi.string().required(),
    PG_PASSWORD: joi.string().required(),
    PG_DB: joi.string().required(),
    DATABASE_URL: joi.string().required(),
    PGADMIN_EMAIL: joi.string().email().default('admin@example.com'),
    PGADMIN_PASSWORD: joi.string().required().default('Abcd@1234'),
    SESSION_SECRET: joi.string().min(32).required(),
    SESSION_COOKIE_NAME: joi.string().default('todo_offline'),
    SESSION_COOKIE_MAX_AGE: joi.number().default(60 * 60 * 24 * 7), // 7 days in seconds
    SESSION_COOKIE_SECURE: joi.boolean().default(false),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
}) as {
  error: Error | undefined;
  value: EnvVars;
};

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  stage: envVars.STAGE,
  pgUser: envVars.PG_USER,
  pgPassword: envVars.PG_PASSWORD,
  pgDb: envVars.PG_DB,
  databaseUrl: envVars.DATABASE_URL,
  pgAdminEmail: envVars.PGADMIN_EMAIL,
  sessionSecret: envVars.SESSION_SECRET,
  sessionCookieName: envVars.SESSION_COOKIE_NAME,
  sessionCookieMaxAge: envVars.SESSION_COOKIE_MAX_AGE,
  pgAdminPassword: envVars.PGADMIN_PASSWORD,
  isProd: process.env.NODE_ENV === 'production',
};
