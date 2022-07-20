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





    const updateCategoryResponse = await request(app).patch(`/categories/${responseCreateCategory.body.id}`).set("Authorization", token).send(newCategory)

    console.log(updateCategoryResponse.body)

    expect(updateCategoryResponse.status).toBe(200)
    expect(updateCategoryResponse.body.category).toHaveProperty('id')
    expect(updateCategoryResponse.body.category).toHaveProperty('newName')
    expect(updateCategoryResponse.body.category).toHaveProperty('newName', category.name)
  })
})
