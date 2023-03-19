const { Sequelize, seq } = require("../configs/dbConfig");

const Users = seq.define("usertable", {
  userId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.DataTypes.STRING,
  },
});


module.exports = Users 
