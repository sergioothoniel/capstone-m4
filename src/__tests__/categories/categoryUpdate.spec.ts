import { DataSource } from "typeorm";
import appDataSource from "../../data-source";
import initialSetup from "../../utils/initialSetup";
import request from 'supertest'
import app from '../../app'

describe("POST - /categories", () => {
  let connection: DataSource

  const user = {
    email: "master@master.com",
    password: process.env.MASTERUSER_PASSWORD
  }
  const category = {
    name: "testing category two"
  }

  const newCategory = {
    newName: 'testing new category'
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

  test("Should a update an category", async () => {

    const responseLogin = await request(app).post('/login').send(user)

    const token = 'Bearer ' + responseLogin.body.token

    const responseCreateCategory = await request(app).post('/categories').set("Authorization", token).send(category)

    const response = await request(app).patch(`/categories/${responseCreateCategory.body.category.id}`).set("Authorization", token).send(newCategory)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("message")
    expect(response.body).toHaveProperty("category")
    expect(response.body.category).toHaveProperty("name", newCategory.newName)
  })
})
