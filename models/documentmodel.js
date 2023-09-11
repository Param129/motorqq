const mongoose=require("mongoose");
const { isNumberObject } = require("util/types");

const documentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter document name"], 
        trim:true,
        maxLength:[50,"Name cannot exceed maxlength"],
    },
    document:{
        type:Object,
        required:[true,"Please enter document description"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
    permissibleuser:[],
})


// exporting the product model
module.exports = mongoose.model("Document",documentSchema);