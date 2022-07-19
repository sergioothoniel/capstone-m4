import { DataSource } from "typeorm";
import appDataSource from "../../data-source";
import initialSetup from "../../utils/initialSetup";
import request from 'supertest'
import app from "../../app";

describe("GET - /categories", () => {
  let connection: DataSource


  const user = {
    email: "master@master.com",
    password: process.env.MASTERUSER_PASSWORD
  }

  const category = {
    name: "category list"
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

  test("Should list an categories", async () => {

    const responseLogin = await request(app).post('/login').send(user)

    const token = 'Bearer ' + responseLogin.body.token

    const responseListCategory = await request(app).get('/categories').set("Authorization", token)
    console.log(responseListCategory.body)
    expect(responseListCategory.status).toBe(200)
  })

})