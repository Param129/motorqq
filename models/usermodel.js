const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const crypto=require("crypto");


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed maclength"],
        minLength:[2,"NAme should have more then 5 characters"]
    },

    password: {
        type: String,
        required: [true, "Please enter your password"],
        // validate: {
        //     validator: function (value) {
        //         // Use a regex to check for at least one alphabet, one special character, and numbers
        //         return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        //     },
        //     message: "Password should contain at least one alphabet, one special character, and numbers (minimum 8 characters)."
        // },
        // select: false
    },

    mobileNo:{
        type:Number,
        required:[true,"Please enter your mobile number"],
        unique:true,
        maxLength:[10],
        minLength:[10],
    }

});






module.exports= mongoose.model("User",userSchema);