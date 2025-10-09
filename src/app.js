import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./modules/user/user.route.js"
import productRoutes from "./modules/product/product.route.js";
import categoryRoutes from "./modules/category/category.route.js"

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", function(req, res){
    return res.json({mseege : "qsdfghjklmtyuio"});
})

export default app;