import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./modules/user/user.route.js"
import productRoutes from "./modules/product/product.route.js";
import categoryRoutes from "./modules/category/category.route.js"
import { logger, notFound, ErrorHandler } from "./middlewares/loggerMiddleware.js";
import { swaggerDocs } from "./swagger.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

swaggerDocs(app);

//Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.use(logger);
app.use(notFound);
app.use(ErrorHandler);

export default app;