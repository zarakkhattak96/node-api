import "reflect-metadata";
import Express from "express";
import bootstrapDi from "./infra/di";
import config from "./infra/config/index";
import connectPrisma from "./infra/db/conn";
import { bootstrapUserRoutes } from "./routes/usersRoutes";
import cors from "cors";

const bootstrap = async () => {
  await connectPrisma();

  console.log("Database is connected");
  const app = Express();
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));
  app.use(cors());

  const diContainer = await bootstrapDi();
  const userRouter = bootstrapUserRoutes(diContainer.userController);

  // using routes
  app.use("/api/v1/users", userRouter);

  const PORT = config.PORT;

  app.listen(PORT, () => {
    console.log(`App is live at ${PORT}`);
  });
};

bootstrap();
