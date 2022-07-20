import { DataSource } from "typeorm"
import appDataSource from "../../data-source"
import initialSetup from "../../utils/initialSetup"
import request from "supertest"
import app from "../../app"

describe("GET - /users", () =>{
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

    test("Should return a object whit number of pages, currrent page, quantity of itens and a list whit the users", async () =>{        

        const responseLogin = await request(app).post('/login').send(user)

        const token = 'Bearer '+responseLogin.body.token       
        

        const response = await request(app).get('/users').set("Authorization", token)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('itensQuantity', 1)
        expect(response.body).toHaveProperty('totalPages', 1)
        expect(response.body).toHaveProperty('page', 1)
        expect(response.body).toHaveProperty('users')
        expect(response.body.users).toHaveLength(1) 
        expect(response.body.users[0]).not.toHaveProperty('password')    

    })

    test("Should show the page when send page query", async () =>{        

        const responseLogin = await request(app).post('/login').send(user)

        const token = 'Bearer '+responseLogin.body.token       
        

        const response = await request(app).get('/users?page=3').set("Authorization", token)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('itensQuantity', 1)
        expect(response.body).toHaveProperty('totalPages', 1)
        expect(response.body).toHaveProperty('page', 3)
        expect(response.body).toHaveProperty('users')
        expect(response.body.users).toHaveLength(0)     

    })

    test("Should list all users", async () =>{        

        const responseLogin = await request(app).post('/login').send(user)

        const token = 'Bearer '+responseLogin.body.token      
        
        const response = await request(app).get('/users/listall').set("Authorization", token)

        expect(response.status).toBe(200)        
        expect(response.body).toHaveLength(1)    
    })

    test("Should show my user", async () =>{        

        const responseLogin = await request(app).post('/login').send(user)

        const token = 'Bearer '+responseLogin.body.token          
        
        const response = await request(app).get('/users/me').set("Authorization", token)

        expect(response.status).toBe(200)        
        expect(response.body).toHaveProperty('id')   
        expect(response.body).toHaveProperty('name')   
        expect(response.body).toHaveProperty('email')   
        expect(response.body).toHaveProperty('password')   
        expect(response.body).toHaveProperty('active', true)
        expect(response.body).toHaveProperty('created_at')
        expect(response.body).toHaveProperty('updated_at') 
        expect(response.body).toHaveProperty('permission') 
        expect(response.body).toHaveProperty('company')   
    })

})