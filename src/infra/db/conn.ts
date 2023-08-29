import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const connectPrisma = async () => {
  await prisma
    .$connect()
    .catch((e: any) => {
      console.log(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  // console.log("Database connected");
};

export default connectPrisma;
