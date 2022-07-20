import { DataSource } from "typeorm";
import appDataSource from "../../data-source";
import initialSetup from "../../utils/initialSetup";
import request from "supertest";
import app from "../../app";

describe("testing route delete products", () => {
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

  test("Should be delete product with sucess", async () => {
    const responseLogin = await request(app).post("/login").send(user);
    const token = "Bearer " + responseLogin.body.token;
    const responseCreatePermission = await request(app)
      .post("/permissions")
      .set("Authorization", token)
      .send({ name: "permissionTest" });

    const permissionId = responseCreatePermission.body.newPermission.id;

    const category = {
      name: "eletronico",
    };
    const responseCreateCategory = await request(app)
      .post("/categories")
      .set("Authorization", token)
      .send(category);

    const categoryId = responseCreateCategory.body.category.id;

    const response = await request(app)
      .post("/products")
      .set("Authorization", token)
      .send({ ...productTest, category_id: categoryId });

    const productId = response.body.newProduct.id;

    const responseDelete = await request(app)
      .delete(`/products/${productId}`)
      .set("Authorization", token);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  });
});
