import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name : {type : String, required : true},
    description : {type: String},
    product: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "product",
            product: []
        }
    ]
}, { timestamps: true });

const Category = mongoose.model("category", categorySchema);

export default Category;