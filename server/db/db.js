const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432:yourdbname",
  {
    logging: false // unless you like the logs
    // ...and there are many other options you may want to play with
  }
);

module.exports = db;

// const Sequielize = require("sequelize");
// const db = new Sequielize("postgres://localhost:5432/boilermaker", {
//   logging: false
//   // ...and there are many other options you may want to play with
// });

// module.exports = db;