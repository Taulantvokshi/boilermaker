const router = require("express").Router();

// matches GET requests to /api/users/
router.get("/", function(req, res, next) {
  res.send("<h1>Bananas</h1>");
});
// matches POST requests to /api/users/
router.post("/", function(req, res, next) {
  /* etc */
});
// matches PUT requests to /api/users/:usersId
router.put("/:userId", function(req, res, next) {
  /* etc */
});
// matches DELETE requests to /api/users/:usersId
router.delete("/:userId", function(req, res, next) {
  /* etc */
});

module.exports = router;
