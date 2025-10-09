import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {type : String, required: true},
    description :{type : String, required: true},
    price : {type: Number, required: true},
    stock : {type : Number, required: true},
    categories : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "category",
        },
    ],
    imageUrl : {type : String},
}, {timestamps : true});

const Product = mongoose.model("product", productSchema);

export default Product;