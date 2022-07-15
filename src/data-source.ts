import "reflect-metadata";
import { DataSource } from "typeorm";

import dotenv from "dotenv";

dotenv.config();

const appDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.ts"],
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      });

export default appDataSource;
