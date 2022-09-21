const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

require('./models/Customer');
require('./models/Transfers');
const CustomerModel=mongoose.model("Customers");
const TransfersModel=mongoose.model("Transfers");
const axios = require("axios");

//Connection to DB
mongoose.connect(
    "mongodb+srv://zeinab-moawad:482000zeinab@bankingsystem.6chtqhn.mongodb.net/test",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log("MongoDB has been connected"))
    .catch((err) => console.log(err));


//Connection to DB
// mongoose.connect(
//     process.env.MONGODB_CONNECTION_STRING,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
// )
//     .then(() => console.log("MongoDB has been connected"))
//     .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// require('./routes/customerRoute.js')(app)
// require('./routes/tranferRoute.js')(app)

const PORT = process.env.PORT || 5000;

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});



// //PortNo to listen on
// app.use(express.json())

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});



app.post("/AddCustomer", async (request, response) => {
    let { Name, Mobile, Email, Address, Gender, AccountNum, Balance, NationalID } = request.body;

    //2.Add Customer

    const newCustomer = new CustomerModel({
        Name,
        Mobile,
        Email,
        Address,
        Gender,
        AccountNum,
        Balance,
        NationalID
    })

    newCustomer.save(async (error, NewCustomerobj) => {
        if (error) {
            response.send({ status: -1, Message: error })
            return;
        }
        if (NewCustomerobj) {
            response.send({ status: 200, Message: "Customer Added Sucessfully", Customer: NewCustomerobj })
            return
        }
        response.send({ status: 402, Message: "Error Happend in Last Step" })

    })
}
)

app.get("/FindCustomers", async (request, response) => {
    CustomerModel.find({}, (err, CustomersObj) => {
        if (err)
            response.send({ status: -1, Message: err })
        else if (CustomersObj.length >= 0)
            response.json(CustomersObj)
    }).sort({ Name: 1 })
})

// //B.Find Customer by ID
app.get("/FindCustomerByID/:ID", async (request, response) => {
    const ID = request.params.ID;

    CustomerModel.find({ _id: ID }, (err, Customerobj) => {
        if (err)
            response.send({ status: -1, err })
        else if (Customerobj.length > 0) {
            response.send({ status: 200, Customerobj })
        }
        else //not found
            response.send({ status: 404, Message: "Customer Not Found" })
    })
})

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
                    const res =axios.post("/AddTransfer", {From:Customer_ID_From, To:Customer_ID_To, amount:Amount })
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