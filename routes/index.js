const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");

const DOCUMENT_NOT_FOUND_ERROR_CODE = 404;

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res
    .status(DOCUMENT_NOT_FOUND_ERROR_CODE)
    .send({ message: "Document not found" });
});

module.exports = router;
