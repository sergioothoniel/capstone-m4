import express from "express";
import "express-async-errors";
import appErrorMiddleware from "./middlewares/appError.middlewares";
import userRouter from "../src/routes/users.routes";
<<<<<<< HEAD
import sessionRouter from "../src/routes/session.routes";
import companiesRoutes from "../src/routes/companies.routes"
const app = express();
app.use(express.json());

app.use("/users", userRouter); 
app.use("/login", sessionRouter); 
// app.use("products", productsRoutes);
app.use("companies", companiesRoutes);
// app.use("orders", ordersRoutes);
// app.use("categories", categoriesRoutes);
=======
import productsRoutes from "./routes/products.routes";
import permissionsRoutes from "./routes/permissions.routes";
import companiesRoutes from "./routes/companies.routes";
import loginRoute from "./routes/login.routes";


const app = express();
app.use(express.json());

>>>>>>> 76a2373889309f66e93d3592c2c73e7881a296ce

app.use("/products", productsRoutes);
app.use("/users", userRouter); 
app.use("/login", loginRoute)
app.use("/permissions", permissionsRoutes);
app.use("/companies", companiesRoutes)
app.use(appErrorMiddleware);

export default app;
