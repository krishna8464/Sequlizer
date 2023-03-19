const { Sequelize, seq } = require("../configs/dbConfig");

const Timeline = seq.define("timelinetab", {
  timelinesId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  previousState: {
    type: Sequelize.DataTypes.STRING,
  },
  newState: {
    type: Sequelize.DataTypes.STRING,
  },
  timestamp: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  },
  message : { 
    type: Sequelize.DataTypes.STRING,
  },
  userId: {  
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: 'usertables',
      key: 'userId'
    }
  },
  orderId: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: 'orders',
      key: 'orderId'
    }
  },
});


module.exports = { Timeline };
