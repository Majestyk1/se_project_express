const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");

const { auth } = require("../middlewares/auth");

const { DOCUMENT_NOT_FOUND_ERROR_CODE } = require("../utils/errors");

router.use("/users", auth, userRouter);
router
  .route("/items")
  .get(clothingRouter)
  .post(auth, clothingRouter)
  .patch(auth, clothingRouter)
  .delete(auth, clothingRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res
    .status(DOCUMENT_NOT_FOUND_ERROR_CODE)
    .send({ message: "Document not found" });
});

module.exports = router;
