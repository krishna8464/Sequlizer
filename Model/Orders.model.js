const { seq, Sequelize } = require("../configs/dbConfig");

const Order = seq.define("orders", {
  orderId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: Sequelize.DataTypes.STRING,
    defaultValue: "CONFIRMED"
  },
});

module.exports = { Order };
