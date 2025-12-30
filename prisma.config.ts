import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { envs } from './src/config';

export default defineConfig({
  schema: "./src/prisma/schema",
  migrations: {
    path: "./src/prisma/migrations",
    seed: 'tsx prisma/seed/index.ts',
  },
  datasource: {
    url: envs.databaseUrl
  },
});
