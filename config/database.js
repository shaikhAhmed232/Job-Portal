const { sequelize, Sequelize } = require('../models');

const sequelizeConnectionType = process.env.sequelizeConnectionType || 'sync';

function DatabaseConnect() {
  sequelize[sequelizeConnectionType]().then(() => {
    console.log('Database Connected');
  }).catch((err) => {
    console.log(`Error While Connecting Database\n${err}\nRetry Database Connection after 5000ms\n`);
    setTimeout(() => {
      DatabaseConnect();
    }, 5000);
  });
}

DatabaseConnect();
