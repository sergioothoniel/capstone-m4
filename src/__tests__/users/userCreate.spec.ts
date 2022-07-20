import { DataSource } from "typeorm"
import appDataSource from "../../data-source"
import initialSetup from "../../utils/initialSetup"
import request from "supertest"
import app from "../../app"

describe("POST - /users", () =>{
    let connection: DataSource

    const user = {
        email: "master@master.com",
        password: process.env.MASTERUSER_PASSWORD
    }

    const userTest = {
        name: "userTeste",
        email: "test@test.com",
        cpf: "12345678912",
        password: "123Rs!789"        
    }

    beforeAll(async () =>{
        await appDataSource.initialize()
        .then((res) => connection = res)
        .catch((err) => console.log("Error during Data Source initialization", err))

        await initialSetup()
    })

    afterAll(async () =>{
        await connection.destroy()
    })

    test("Should create an user", async () =>{        

        const responseLogin = await request(app).post('/login').send(user)

        const token = 'Bearer '+responseLogin.body.token

        const responseCreatePermission = await request(app).post('/permissions').set("Authorization", token).send({name: "permissionTest"})

        const permissionId = responseCreatePermission.body.newPermission.id

        const company = {
            name: "Kenzie",
            cnpj: "1234567"
        }

        const responseCreateCompany = await request(app).post('/companies').set("Authorization", token).send(company)

        const companyId = responseCreateCompany.body.id

        

        const response = await request(app).post('/users').set("Authorization", token).send({...userTest, permission_id: permissionId, company_id: companyId})

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('newUser')
        expect(response.body.newUser).toHaveProperty('id')
        expect(response.body.newUser).toHaveProperty('id')
        expect(response.body.newUser).toHaveProperty('name', userTest.name)
        expect(response.body.newUser).toHaveProperty('email', userTest.email)
        expect(response.body.newUser).toHaveProperty('cpf', userTest.cpf)



    })

    test("Should throw an error when cpf is already registred", async () =>{
        
        const responseLogin = await request(app).post('/login').send(user)

        const token = 'Bearer '+responseLogin.body.token

        const responseCreatePermission = await request(app).post('/permissions').set("Authorization", token).send({name: "permissionTest2"})

        const permissionId = responseCreatePermission.body.newPermission.id

        const company = {
            name: "Kenzie Academy",
            cnpj: "89101112"
        }

        const responseCreateCompany = await request(app).post('/companies').set("Authorization", token).send(company)

        const companyId = responseCreateCompany.body.id      

        const response = await request(app).post('/users').set("Authorization", token).send({...userTest, permission_id: permissionId, company_id: companyId})

        expect(response.status).toBe(400) 
        expect(response.body).toHaveProperty('message', "User already registred")    

    })
})