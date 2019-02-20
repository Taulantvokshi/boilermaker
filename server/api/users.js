const router = require("express").Router();
const { User } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email"]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// const router = require("express").Router();
// const User = require("../db/models/User");

// // matches GET requests to /api/users/
// router.get("/me", (req, res, next) => {
//   res.json(req.user);
// });

// router.put("/login", (req, res, next) => {
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//     .then(user => {
//       if (!user) res.status(401).send("User not found");
//       else if (!user.hasMatchingPassword(req.body.password))
//         res.status(401).send("Incorrect password");
//       else {
//         req.login(user, err => {
//           if (err) next(err);
//           else res.json(user);
//         });
//       }
//     })
//     .catch(next);
// });

// router.post("/signup", (req, res, next) => {
//   User.create(req.body)
//     .then(user => {
//       console.log("inside");
//       req.login(user, err => {
//         if (err) next(err);
//         else res.json(user);
//       });
//     })
//     .catch(next);
// });

// router.delete("/logout", (req, res, next) => {
//   req.logout();
//   req.session.destroy();
//   res.sendStatus(204);
// });

// router.get("/", function(req, res, next) {
//   res.send("<h1>Bananas</h1>");
// });

// module.exports = router;
