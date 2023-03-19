const Sequelize = require("sequelize") 

const seq = new Sequelize("org", "root", "pankipanki", {
    host : "localhost", 
    dialect : "mysql"
})

seq.authenticate()
.then((res)=>{
    console.log("Connection Successfull to db")
})

module.exports = { seq,Sequelize }