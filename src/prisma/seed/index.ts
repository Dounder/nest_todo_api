import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { PrismaClient } from 'prisma/client';
import { envs } from '../../config/';
import { users } from './users.seed';

const pool = new Pool({ connectionString: envs.databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const seedDatabase = async () => {
  await Promise.all(
    users.map(async (u) => {
      await prisma.user.upsert({
        where: { email: u.email },
        update: { ...u },
        create: { ...u },
      });
    }),
  );
};

seedDatabase()
  .then(async () => {
    console.log('Database seeded');
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Error seeding database:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
