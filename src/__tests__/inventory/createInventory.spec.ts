import { DataSource } from "typeorm";
import appDataSource from "../../data-source";
import initialSetup from "../../utils/initialSetup";
import request from "supertest";
import app from "../../app";

describe("testing route /products", () => {
  let connection: DataSource;

  const user = {
    email: "master@master.com",
    password: process.env.MASTERUSER_PASSWORD,
  };

  const productTest = {
    name: "Celular Kenzie",
    description: "Um celular para estudos da kenzie",
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

  test("Should be able to create inventory", async () => {
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

    const categoryId = responseCreateCategory.body.id;

    const responseCreateProduct = await request(app)
      .post("/products")
      .set("Authorization", token)
      .send({ ...productTest, category_id: categoryId });
      
    const productId = responseCreateProduct.body.newProduct.id;

    const inventory = {
      product_id: productId,
      total_value: 10,
      quantity: 10,
    };

    const response = await request(app)
      .post("/inventory")
      .set("Authorization", token)
      .send({ ...inventory });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("newProduct");
    expect(response.body.newProduct).toHaveProperty("id");
    expect(response.body.newProduct).toHaveProperty("product");
    expect(response.body.newProduct).toHaveProperty("unitary_value");
    expect(response.body.newProduct).toHaveProperty("quantity");
    expect(response.body.newProduct).toHaveProperty("total_value");
    expect(response.body.newProduct).toHaveProperty("created_at");
    expect(response.body.newProduct).toHaveProperty("updated_at");
  });

  test("Should throw an error when information was not entered correctly", async () => {
    const responseLogin = await request(app).post("/login").send(user);
    const token = "Bearer " + responseLogin.body.token;
    const responseCreatePermission = await request(app)
      .post("/permissions")
      .set("Authorization", token)
      .send({ name: "permissionTest2" });

    const permissionId = responseCreatePermission.body.newPermission.id;

    const inventory = {
      product_id: "1234",
    };
    const response = await request(app)
      .post("/inventory")
      .set("Authorization", token)
      .send({ ...inventory });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Enter the information correctly!"
    );
  });
});
