import { DataSource } from "typeorm"
import appDataSource from "../../data-source"
import "dotenv/config"
import request from "supertest"
import app from "../../app"
import initialSetup from "../../utils/initialSetup"

describe("GET - /companies", () =>{
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

    test("Should list all companies", async () =>{
        
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

        await request(app).post('/companies').set("Authorization", token).send(company)

        const response = await request(app).get('/companies').set("Authorization", token)

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(2)
        expect(response.body[1]).toHaveProperty('cnpj', company.cnpj)      
              
    })
    
})