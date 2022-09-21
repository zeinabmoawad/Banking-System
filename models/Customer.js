import mongoose from "mongoose";

//Defing Schema
const  CustomerSchema=mongoose.Schema({
    Name:{
        type:String,
        required:true,
        unique:true //no two Customers have same name check this tet case when taking input from Customer
    },
    Mobile:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    AccountNum:{
        type:String,
        required:true
    },
    Balance:{
        type:Number,
        required:true,
        default:0
    },
   NationalID:{
        type:String,
        required:true
    },
})

//creating Collection
const CustomerModel=mongoose.model("Customers",CustomerSchema)

export default CustomerModel