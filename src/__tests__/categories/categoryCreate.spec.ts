import { DataSource } from "typeorm";
import appDataSource from "../../data-source";
import initialSetup from "../../utils/initialSetup";
import request from 'supertest'
import app from "../../app";

describe("POST - /categories", () => {
  let connection: DataSource

  const user = {
    email: "master@master.com",
    password: process.env.MASTERUSER_PASSWORD
  }
  const category = {
    name: "testing category two"
  }

  beforeAll(async () => {
    await appDataSource.initialize()
      .then((res) => connection = res)
      .catch((err) => console.log("error datasource", err))

    await initialSetup()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Should create an category", async () => {

    const responseLogin = await request(app).post('/login').send(user)

    const token = 'Bearer ' + responseLogin.body.token

    const responseCreateCategory = await request(app).post('/categories').set("Authorization", token).send(category)


    const categoryId = responseCreateCategory.body.id

    expect(responseCreateCategory.status).toBe(201)
    expect(responseCreateCategory.body).toHaveProperty('message')
    expect(responseCreateCategory.body.category).toHaveProperty('id')
    expect(responseCreateCategory.body.category).toHaveProperty('name')
    expect(responseCreateCategory.body.category).toHaveProperty('name', category.name)
  })
})
