const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");

const NotFoundError = require("../utils/errors/NotFoundError");
const {
  loginValidation,
  userInfoBodyValidation,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.post("/signin", loginValidation, login);
router.post("/signup", userInfoBodyValidation, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Document not found"));
});

module.exports = router;
