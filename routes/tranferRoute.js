const mongoose = require("mongoose");
const CustomerModel=mongoose.model("Customers");
const TransfersModel=mongoose.model("Transfers");
const axios = require("axios");
module.exports = (app) =>{
    //c.
app.put("/Transfer", async (request, response) => {
    const { Customer_ID_From, Customer_ID_To, Amount } = request.body
    //check if this Workshop exists
    const CustomerFrom = CustomerModel.find({ _id: Customer_ID_From }, async(err, CustomerFromObj) => {
        if (err)
            response.send({ status: -1, err })
        else if (CustomerFromObj.length > 0) {
            //get User
            const CustomerTo = CustomerModel.find({ _id: Customer_ID_To }, async(err, CustomerToObj) => {
                if (err)
                    response.send({ status: -1, err })
                else if (CustomerToObj.length > 0) {
                    var BalanceFrom = CustomerFromObj[0].Balance;
                    var BalanceTo = CustomerToObj[0].Balance;
                    BalanceFrom = BalanceFrom - Number(Amount);
                    BalanceTo = BalanceTo + Number(Amount);
                    //workshop is OK
                    const Customerquery = CustomerModel.findByIdAndUpdate({ _id: Customer_ID_From }, { Balance: BalanceFrom },(err,updated)=>{
    
                            if(err){
                                console.log("error");
                            }
                            else{
                                console.log("updated");
                            }
                        })
                    if (Customerquery.matchedCount <= 0) {
                        response.send({ status: 404, Message: "No Customer with this id" })
                        return
                    }
                    const Customerquery1 = CustomerModel.findByIdAndUpdate({ _id: Customer_ID_To }, { Balance: BalanceTo },(err,updated)=>{
    
                        if(err){
                            console.log("error");
                        }
                        else{
                            console.log("updated");
                        }
                    })
                    if (Customerquery1.matchedCount <= 0) {
                        response.send({ status: 404, Message: "No Customer with this id" })
                        return
                    }
                  
                    // //else done 
                    // //add Thus student to WorkShop
                    console.log(Customer_ID_From);
                    const res =axios.post(`/AddTransfer`, {From:Customer_ID_From, To:Customer_ID_To, amount:Amount })
                    if (res.status != 200) {
                        response.send({ status: 402, Mesaage: res.Message })
                        return;
                    }
                    response.send({ Message: "Transfer Operation succeeded" })
                    return
                }
                else //not found
                {
                    console.log(CustomerToObj);
                    response.send({ status: 404, Message: "Customer not Found to transfer to Him" })
                }

            });
        }
        else //not found
            response.send({ status: 404, Message: "Customer not Found to transfer from Him" })
    })
})
app.post("/AddTransfer", async (request, response) => {
    let { From, To, amount } = request.body;

    //2.Add Customer
console.log(From);
console.log(To);
    const newTranfer = new TransfersModel({
        From,
        To,
        amount
    })

    newTranfer.save(async (error, NewTransferobj) => {
        if (error) {
            response.send({ status: -1, Message: error })
            return;
        }
        if (NewTransferobj) {
            response.send({ status: 200, Message: "Customer Added Sucessfully", Transfer: NewTransferobj })
            return
        }
        response.send({ status: 402, Message: "Error Happend in Last Step" })

    })
})
    }
    