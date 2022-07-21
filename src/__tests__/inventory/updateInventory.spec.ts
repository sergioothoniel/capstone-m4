import { DataSource } from "typeorm";
import appDataSource from "../../data-source";
import initialSetup from "../../utils/initialSetup";
import request from "supertest";
import app from "../../app";

describe("PATCH /inventory", () => {
  let connection: DataSource;

  const user = {
    email: "master@master.com",
    password: process.env.MASTERUSER_PASSWORD,
  };

  const productTest = {
    name: "Celular Kenzie",
    description: "Um celular para estudos da kenzie",
  };

  const productTest2 = {
    name: "martelo",
    description: "teste",
  };

  const productTest3 = {
    name: "teste3",
    description: "teste",
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

  test("Should be able to increase quantity of an item on inventory", async () => {
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

    const item = {
      product_id: productId,
      unitary_value: 10,
      quantity: 10,
    };

    const responseInsertItem = await request(app)
      .post("/inventory")
      .set("Authorization", token)
      .send(item);

    const inventoryId = responseInsertItem.body.id;
    const previousQty = responseInsertItem.body.quantity
    const previousTotal = responseInsertItem.body.total_value

    const addItens = {
      "type_order": "input",
      "quantity": 10,
      "unitary_value": 15

    }

    const responseUpdate = await request(app)
      .patch(`/inventory/${inventoryId}`)
      .set("Authorization", token)
      .send(addItens);

    expect(responseUpdate.status).toBe(200);
    expect(responseUpdate.body).toHaveProperty("message");
    expect(responseUpdate.body).toHaveProperty("inventory");
    expect(responseUpdate.body.inventory).toHaveProperty("quantity", addItens.quantity + previousQty);
    expect(responseUpdate.body.inventory).toHaveProperty("total_value", (addItens.quantity * addItens.unitary_value) + previousTotal);
    expect(responseUpdate.body.inventory).toHaveProperty("unitary_value", responseUpdate.body.inventory.total_value/responseUpdate.body.inventory.quantity);
    
  });

  test("Should be able to decrease quantity of an item on inventory", async () => {
    const responseLogin = await request(app).post("/login").send(user);
    const token = "Bearer " + responseLogin.body.token;

    const category = {
      name: "ferramenta",
    };
    const responseCreateCategory = await request(app)
      .post("/categories")
      .set("Authorization", token)
      .send(category);

    const categoryId = responseCreateCategory.body.category.id;

    const responseCreateProduct = await request(app)
      .post("/products")
      .set("Authorization", token)
      .send({ ...productTest2, category_id: categoryId });

    const productId = responseCreateProduct.body.newProduct.id;

    const item = {
      product_id: productId,
      unitary_value: 10,
      quantity: 10,
    };

    const responseInsertItem = await request(app)
      .post("/inventory")
      .set("Authorization", token)
      .send(item);

    const inventoryId = responseInsertItem.body.id;
    const previousQty = responseInsertItem.body.quantity
    const previousTotal = responseInsertItem.body.total_value

    const removeItens = {
      "type_order": "output",
      "quantity": 10,  

    }

    const responseUpdate = await request(app)
      .patch(`/inventory/${inventoryId}`)
      .set("Authorization", token)
      .send(removeItens);

    expect(responseUpdate.status).toBe(200);
    expect(responseUpdate.body).toHaveProperty("message");
    expect(responseUpdate.body).toHaveProperty("inventory");
    expect(responseUpdate.body.inventory).toHaveProperty("quantity", removeItens.quantity - previousQty);
    expect(responseUpdate.body.inventory).toHaveProperty("total_value", previousTotal - (removeItens.quantity*(previousTotal/previousQty)));
    expect(responseUpdate.body.inventory).toHaveProperty("unitary_value");    
  });

  test("Should throw an error when quantity is not enough", async () => {
    const responseLogin = await request(app).post("/login").send(user);
    const token = "Bearer " + responseLogin.body.token;

    const category = {
      name: "teste3",
    };
    const responseCreateCategory = await request(app)
      .post("/categories")
      .set("Authorization", token)
      .send(category);

    const categoryId = responseCreateCategory.body.category.id;

    const responseCreateProduct = await request(app)
      .post("/products")
      .set("Authorization", token)
      .send({ ...productTest3, category_id: categoryId });

    const productId = responseCreateProduct.body.newProduct.id;

    const item = {
      product_id: productId,
      unitary_value: 10,
      quantity: 10,
    };

    const responseInsertItem = await request(app)
      .post("/inventory")
      .set("Authorization", token)
      .send(item);

    const inventoryId = responseInsertItem.body.id;
   
    const removeItens = {
      "type_order": "output",
      "quantity": 30,  
    }

    const responseUpdate = await request(app)
      .patch(`/inventory/${inventoryId}`)
      .set("Authorization", token)
      .send(removeItens);

    expect(responseUpdate.status).toBe(400);
    expect(responseUpdate.body).toHaveProperty("message");
    expect(responseUpdate.body).toHaveProperty("itensOnInventory");        
  });  
});
