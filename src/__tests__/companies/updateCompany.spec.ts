import { DataSource } from "typeorm"
import appDataSource from "../../data-source"
import "dotenv/config"
import request from "supertest"
import app from "../../app"
import initialSetup from "../../utils/initialSetup"

describe("PATCH - /companies", () =>{
    let connection: DataSource

    beforeAll(async () =>{
        await appDataSource.initialize()
        .then((res) => connection = res)
        .catch((err) => console.log("Error during Data Source initialization", err))

        await initialSetup()
    })

    afterAll(async () =>{
        await connection.destroy()
    })

    test("Should update a company", async () =>{
        
        const user = {
            email: "master@master.com",
            password: process.env.MASTERUSER_PASSWORD
        }

        const responseLogin = await request(app).post('/login').send(user)

        const token = 'Bearer '+responseLogin.body.token

        const company = {
            name: "Kenzie",
            cnpj: "1234567"
        }

        const responseCreateCompany = await request(app).post('/companies').set("Authorization", token).send(company)

        const companyId = responseCreateCompany.body.id

        const response = await request(app).patch(`/companies/${companyId}`).set("Authorization", token).send({name: "Kenzie Academy"})

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('company')
        expect(response.body.company).toHaveProperty('id')
        expect(response.body.company).toHaveProperty('name', "Kenzie Academy")
        expect(response.body.company).toHaveProperty('cnpj', company.cnpj)       
               
    })

    
})