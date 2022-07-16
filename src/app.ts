import express from "express";
import "express-async-errors"
import appErrorMiddleware from "./middlewares/appError.middlewares";
import userRouter from "../src/routes/users.routes";
import sessionRouter from "../src/routes/session.routes";
import permissionsRoutes from "./routes/permissions.routes";

const app = express();
app.use(express.json());

app.use("/users", userRouter); 
app.use("/login", sessionRouter); 
app.use("/permissions", permissionsRoutes);


app.use(appErrorMiddleware);

export default app;
