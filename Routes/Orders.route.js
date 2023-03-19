const express = require("express");
const orderRoute = express.Router()
const { authMiddleware } = require("../Middleware/auth");
const { Order } = require("../Model/Orders.model");
const { Timeline } = require("../Model/Timelines.model");
const Users = require("../Model/Users.model");
  
// relation defined between two tables
Users.hasMany(Order, { foreignKey : 'userId' })
Order.belongsTo(Users, { foreignKey : 'userId' })
  
orderRoute.get("/", authMiddleware, async(req,res)=>{
   
    Order.hasMany(Timeline, { foreignKey: 'orderId' });
    let { userId } = req.body

    try{
        let orderDetails = await Order.findAll({ where : { userId : userId }, include : [ { model : Timeline } ] })
        res.send(orderDetails)
    }
    catch(e){
        res.status(500).send(e)
    }
})

//get the details of a particular order with timeline data.
orderRoute.get("/:id", authMiddleware , async(req,res)=>{

    let orderId = req.params.id
    Order.hasMany(Timeline, { foreignKey: 'orderId' });

    try{

        //Finding the current order with the timelines data in it. 
        let currentOrderData = await Order.findOne({ where : { orderId : Number(orderId), userId : req.body.userId },  include : [ { model : Timeline } ] })
        res.send({ data : currentOrderData })
        
    }
    catch(e){
        console.log(e);
        res.status(500).send(e)
    }

})

// creating a new Order
orderRoute.post("/newOrder", authMiddleware, async(req,res)=>{
    let body = req.body
    try{
        await Order.create(body)
        res.send("Order Placed Successfully!")
    }
    catch(e){
        res.status(500).send(e)
    }

})

//Changing the state of a order with its timeline as well.
orderRoute.patch("/editStatus", authMiddleware ,async(req,res)=>{
    
    let body = req.body
    try{
        // Find if actually the order exists or not.
        let currentOrder = await Order.findOne({ where : { orderId : body.orderId, userId : body.userId } })
        
        //storing currentOrder Status 
        let statusToUpdateInTimeline = currentOrder.status
        
        if(currentOrder)
        {
            //updating Current order status
            currentOrder.status = body.status
            await currentOrder.save()

            //First finding whether the timeline exists or not with that particular orderId for the current user.
            let record = await Timeline.findOne({ where : { orderId : body.orderId, userId : body.userId } })
            if(record)
            {
                //if timeline already exists then simply update it.
                record.previousState = statusToUpdateInTimeline
                record.newState = body.status
                record.message = `Order updated from ${statusToUpdateInTimeline} to ${body.status} at ${Date.now()}`
                await record.save()
                res.status(200).send("Status updated in timeline and Orders table")
            }
            else{

                // if Timeline does not exists with the current user and current order then create a new one.
                await Timeline.create({ userId : body.userId, orderId : body.orderId, previousState : statusToUpdateInTimeline, newState : body.status, message : `Order updated from ${currentOrder._previousDataValues.status} to ${body.status} at ${Date.now()}` })
                res.status(200).send("Timeline Table created")
            }
        }
        else{
            res.send("No orders found for current user.")
        }
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = { orderRoute }