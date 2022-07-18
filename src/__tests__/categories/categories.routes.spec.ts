import request from 'supertest'
import app from '../../app'
import { DataSource } from 'typeorm'
import appDataSource from '../../data-source'

describe("Testing the categories routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await appDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during dataSource initialization", err)
      })
  })



  afterAll(async () => {
    await connection.destroy()
  })


  test("Testando Criação de categoria", async () => {
    const name = 'Categoria Teste'

    const categoryData = { name }

    const response = await request(app).post("/categories").send(categoryData)

    expect(response.status).toBe(201)

  })
  test("Testando listagem categoria", async () => {


    const response = await request(app).get("/categories")

    expect(response.status).toBe(200)
    expect(response.body[0].name).toContain("Categoria Teste")
  })
})