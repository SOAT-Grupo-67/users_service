import "reflect-metadata";
import express from "express";
import { routes } from "./routes";

import "dotenv/config";
import { AppDataSource } from "./infra/TypeORM/config";

async function main() {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  try {
    await AppDataSource.initialize();
    console.log("Data base running...");

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(routes);

    app.listen(port, () => {
      console.log(`🚀 Produtos service running on port ${port}`);
    });
  } catch (error) {
    console.error("Error during application initialization:", error);
    process.exit(1);
  }
}

main();
