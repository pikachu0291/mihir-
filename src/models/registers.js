const mongoose = require("mongoose");

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    score: {
        type: Number,
        default: 0
    },
    isAdmin: { type: Boolean, default: false }
});

// creation of model 
const Register = new mongoose.model("Register",userSchema);

module.exports = Register;