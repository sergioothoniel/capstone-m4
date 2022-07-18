import express from "express";
import "express-async-errors";
import appErrorMiddleware from "./middlewares/appError.middlewares";
import userRouter from "../src/routes/users.routes";
import productsRoutes from "./routes/products.routes";
import permissionsRoutes from "./routes/permissions.routes";
import companiesRoutes from "./routes/companies.routes";
import loginRoute from "./routes/login.routes";


const app = express();
app.use(express.json());


app.use("/products", productsRoutes);
app.use("/users", userRouter); 
app.use("/login", loginRoute)
app.use("/permissions", permissionsRoutes);
app.use("/companies", companiesRoutes)
app.use(appErrorMiddleware);

export default app;
