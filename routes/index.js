const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingItems");

const { DOCUMENT_NOT_FOUND_ERROR_CODE } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingRouter);

router.use((req, res) => {
  res
    .status(DOCUMENT_NOT_FOUND_ERROR_CODE)
    .send({ message: "Document not found" });
});

module.exports = router;
