const mongoose = require("mongoose");

//Defing Schema
const  TransferSchema=mongoose.Schema({
    From:{
        type:String,
        required:true, 
    },
    To:{
        type:String,
        required:true,
    },
   amount:{
        type:Number,
        required:true
    },
})

//creating Collection
module.exports=mongoose.model("Transfers",TransferSchema)
