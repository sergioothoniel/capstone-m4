import express from "express";

const app = express();
app.use(express.json());

// app.use("users", userRoutes);
// app.use("products", productsRoutes);
// app.use("companies", companiesRoutes);
// app.use("orders", ordersRoutes);
// app.use("categories", categoriesRoutes);

export default app;
