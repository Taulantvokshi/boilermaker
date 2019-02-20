const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const db = require("./db/db");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();
// plug the store into our session middleware

//api routes
app.use("/api", require("./api/index"));

// Any routes or other various middlewares should go here!

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
