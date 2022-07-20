import { DataSource } from "typeorm"
import appDataSource from "../../data-source"
import "dotenv/config"
import request from "supertest"
import app from "../../app"
import initialSetup from "../../utils/initialSetup"

describe("Post - /permissions", () =>{
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

    test("Should create a permission", async () =>{
        
        const user = {
            email: "master@master.com",
            password: process.env.MASTERUSER_PASSWORD
        }

        const responseLogin = await request(app).post('/login').send(user)

        const token = 'Bearer '+responseLogin.body.token

        const response = await request(app).post('/permissions').set("Authorization", token).send({name: "permissionTest"})

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', "Permission Registred")
        expect(response.body).toHaveProperty("newPermission")
        expect(response.body.newPermission).toHaveProperty('id')
        expect(response.body.newPermission).toHaveProperty('name', 'permissionTest')
               
    })

    
})