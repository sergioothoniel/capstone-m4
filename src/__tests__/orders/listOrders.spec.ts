import { DataSource } from "typeorm";
import appDataSource from "../../data-source";
import initialSetup from "../../utils/initialSetup";
import request from "supertest";
import app from "../../app";

describe("GET /orders", () => {
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

  test("Should be able to list all orders", async () => {
    const responseLogin = await request(app).post("/login").send(user);
    const token = "Bearer " + responseLogin.body.token;

    const category = {
      name: "eletronico",
    };
    const responseCreateCategory = await request(app)
      .post("/categories")
      .set("Authorization", token)
      .send(category);

    const categoryId = responseCreateCategory.body.category.id;

    const responseCreateProduct = await request(app)
      .post("/products")
      .set("Authorization", token)
      .send({ ...productTest, category_id: categoryId });

    const productId = responseCreateProduct.body.newProduct.id;

    const order = {
      product_id: productId,
      type: "input",
      quantity: 10
    };

    const responseCreateOrder = await request(app)
      .post("/orders")
      .set("Authorization", token)
      .send(order); 

    const response = await request(app)
    .get("/orders")
    .set("Authorization", token)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("itensQuantity", 1) 
    expect(response.body).toHaveProperty("page", 1) 
    expect(response.body).toHaveProperty("totalPages", 1)
    expect(response.body.orders).toHaveLength(1)        
    
  });

});
