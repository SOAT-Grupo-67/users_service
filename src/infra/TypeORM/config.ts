import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST || "localhost",
  port: 3306,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "soat_desafio",
  logging: true,
  synchronize: true,
  entities: [UserEntity],
});
