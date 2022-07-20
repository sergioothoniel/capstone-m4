import { DataSource } from "typeorm";
import appDataSource from "../../data-source";
import initialSetup from "../../utils/initialSetup";
import request from "supertest";
import app from "../../app";

describe("testing route list products", () => {
  let connection: DataSource;

  const user = {
    email: "master@master.com",
    password: process.env.MASTERUSER_PASSWORD,
  };

  const productTest = {
    name: "Celular Kenzie",
    description: "Um celular para estudos da kenzie",
    category: "eletronico",
  };

  beforeAll(async () => {
    await appDataSource
      .initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during dataSource initialization", err);
      });
    await initialSetup();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be list all products", async () => {
    const responseLogin = await request(app).post("/login").send(user);
    const token = "Bearer " + responseLogin.body.token;

    const response = await request(app)
      .get("/products")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("itensQuantity");
    expect(response.body).toHaveProperty("totalPages");
    expect(response.body).toHaveProperty("page", 1);
    expect(response.body).toHaveProperty("products");
  });

  test("Should be able to show the page when send page query", async () => {
    const responseLogin = await request(app).post("/login").send(user);

    const token = "Bearer " + responseLogin.body.token;

    const response = await request(app)
      .get("/products?page=3")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("itensQuantity");
    expect(response.body).toHaveProperty("totalPages");
    expect(response.body).toHaveProperty("page", 3);
    expect(response.body).toHaveProperty("products");
  });
  test("Should be able to list all products", async () => {
    const responseLogin = await request(app).post("/login").send(user);

    const token = "Bearer " + responseLogin.body.token;

    const response = await request(app)
      .get("/products/listall")
      .set("Authorization", token);

    expect(response.status).toBe(200);
  });
});
