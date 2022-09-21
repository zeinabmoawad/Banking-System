import mongoose from "mongoose";

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
const TransferModel=mongoose.model("Transfers",TransferSchema)

export default TransferModel