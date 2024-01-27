import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('pass123', 10);
  await prisma.user.upsert({
    where: { email: 'anthondev@mail.com' },
    update: {},
    create: {
      email: 'anthondev@mail.com',
      name: 'Anthony Gonzalez',
      password: hashedPassword,
    },
  });
  await prisma.user.upsert({
    where: { email: 'ielorduy@aluxion.com' },
    update: {},
    create: {
      email: 'ielorduy@aluxion.com',
      name: 'Ignacio Elorduy',
      password: hashedPassword,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
