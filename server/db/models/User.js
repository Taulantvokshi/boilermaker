const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("User", {
  name: {
    type: Sequelize.String
  }
});

module.exports = User;
