const router = require("express").Router();

const auth = require("../middlewares/auth");

const { getCurrentUser, updateUser } = require("../controllers/users");
const { userInfoValidation } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, userInfoValidation, updateUser);

module.exports = router;
