// const { seq } = require("./configs/dbConfig")
const express = require("express")
// const { UserRoute } = require("./Routes/User.route")
// const { orderRoute } = require("./Routes/Orders.route")
const app = express()

app.use(express.json())

app.get("/hello", (req,res)=>{
    res.send("Welcome To The Server 1")
})

// app.use("/user", UserRoute)
// app.use("/orders",  orderRoute)

app.listen(8080, async()=>{
    // await seq.sync()
    console.log("Server Connected");
})



