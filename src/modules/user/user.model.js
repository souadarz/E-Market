import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {type : string, required: true},
    email : { type : email, required: true, unique : true},
    password: { type : password, required: true},
    role : { 
        type : string,
        enum: ["admin", "user"],
        default: "user"
    },
}, {timestamps : true});

const User = mongoose.model("User", userSchema);

export default User;