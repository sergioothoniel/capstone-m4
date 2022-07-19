import { DataSource } from "typeorm"
import appDataSource from "../../data-source"
import "dotenv/config"
import request from "supertest"
import app from "../../app"
import initialSetup from "../../utils/initialSetup"

describe("Post - /login", () =>{
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

    test("Should login e return a token", async () =>{
        
        const user = {
            email: "master@master.com",
            password: process.env.MASTERUSER_PASSWORD
        }

        const response = await request(app).post('/login').send(user)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")        
    })

    test("Should throw an error when user is not registred", async () =>{
        
        const user = {
            email: "teste@email.com",
            password: 123456
        }

        const response = await request(app).post("/login").send(user)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")        
    })
})