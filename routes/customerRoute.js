import { model } from "mongoose";
const CustomerModel=model("Customers");
export default(app)=>{
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
})}
