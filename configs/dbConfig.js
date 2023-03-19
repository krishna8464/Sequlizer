const Sequelize = require("sequelize") 

const seq = new Sequelize("org", "root", "Vamshi@111047", {
    host : "localhost", 
    dialect : "mysql"
})

seq.authenticate()
.then((res)=>{
    console.log("Connection Successfull to db")
})

module.exports = { seq,Sequelize }
