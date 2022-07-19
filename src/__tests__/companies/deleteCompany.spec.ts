import { DataSource } from "typeorm"
import appDataSource from "../../data-source"
import "dotenv/config"
import request from "supertest"
import app from "../../app"
import initialSetup from "../../utils/initialSetup"

describe("DELETE - /companies", () =>{
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

    test("Should delete a company", async () =>{
        
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

        const response = await request(app).delete(`/companies/${companyId}`).set("Authorization", token)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')               
    })

    test("Should throw an error when send wrong id", async () =>{
        
        const user = {
            email: "master@master.com",
            password: process.env.MASTERUSER_PASSWORD
        }

        const responseLogin = await request(app).post('/login').send(user)

        const token = 'Bearer '+responseLogin.body.token   
              
        const response = await request(app).delete(`/companies/123`).set("Authorization", token)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')               
    })

    
})