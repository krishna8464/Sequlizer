const express = require("express");
const UserRoute = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../Model/Users.model");

UserRoute.get("/", async (req, res) => {
  res.send("Working");
});

UserRoute.post("/create", async (req, res) => {
  let body = req.body;
  try {
    await Users.create(body);
    res.send("User Created");
  } catch (error) {
    res.status(500).send(error)
  }
});

UserRoute.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try{
    let userData = await Users.findOne({ where: { email:email} });
    if (userData.password == password) {
        let decodedToken = jwt.sign({ id: userData.userId }, "loginToken");
        res.send({ token: decodedToken });
        return
    } 
  }
  catch(e){
    res.send("Please enter valid credentials.")
  }
});

module.exports = {
  UserRoute,
};
