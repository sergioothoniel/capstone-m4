import express from "express";
import "express-async-errors"
import appErrorMiddleware from "./middlewares/appError.middlewares";

const app = express();
app.use(express.json());

// app.use("users", userRoutes); 
// app.use("products", productsRoutes);
// app.use("companies", companiesRoutes);
// app.use("orders", ordersRoutes);
// app.use("categories", categoriesRoutes);

app.use(appErrorMiddleware);

export default app;
