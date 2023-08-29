// import mongoose from "mongoose";
// import config from "../config";

// export const connectDb = async () =>
// 	mongoose
// 		.connect(config.DB_URL, {
// 			dbName: "userData",
// 		})
// 		.then(() => console.log("Database Connected"))
// 		.catch((e) => console.log(e));

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const connectPrisma = async () => {
  await prisma
    .$connect()
    .catch((e) => {
      console.log(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  // console.log("Database connected");
};

export default connectPrisma;
