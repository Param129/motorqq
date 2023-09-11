const User = require("../models/usermodel")
const ErrorHandler = require("../utils/errorhandler");

exports.registeruser=async(req,res,next)=>{
    const {name,password,mobileNo}=req.body;

    const user=await User.create({
        name,password,mobileNo
    });
    res.status(200).json({
        success:true,
    })
}

exports.getallUser=async(req,res,next)=>{
    const users=await User.find().select('mobileNo');
    res.status(200).json({
        success:true,
        users
    })
}


exports.login=async(req,res,next)=>{
    const{name,password}=req.body;
    if(!name || !password){
        return next(new ErrorHandler("Please enter username and password",400));
    }
    const user =await User.findOne({name:name}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid username or password",401));
    }

    // const ispasswordmatched =await user.comparePassword(password);
    if(req.body.password!==user.password){
        return next(new ErrorHandler("Invalid username or password",401));
    }


    res.status(200).json({
        success:true,
    });
}


exports.uploaddocument