import { DataSource } from "typeorm";
import appDataSource from "../../data-source";
import initialSetup from "../../utils/initialSetup";
import request from 'supertest'
import app from '../../app'

describe("DELETE - /categories", () => {
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

  test("Should delete a category", async () => {

    const responseLogin = await request(app).post('/login').send(user)

    const token = 'Bearer ' + responseLogin.body.token

    const responseCreateCategory = await request(app).post('/categories').set("Authorization", token).send(category)

    const response = await request(app).delete(`/categories/${responseCreateCategory.body.category.id}`).set("Authorization", token)


    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("message")
  })

  test("Should throw an error when id is wrong", async () => {

    const responseLogin = await request(app).post('/login').send(user)

    const token = 'Bearer ' + responseLogin.body.token    

    const response = await request(app).delete(`/categories/123456789`).set("Authorization", token)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")
  })
})
