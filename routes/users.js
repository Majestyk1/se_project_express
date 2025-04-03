const { getUsers, createUser, getUser } = require("../controllers/users");
const router = require("express").Router();

router.get("/", getUsers);
router.post("/", createUser);

router.get("/:userId", getUser);

module.exports = router;
