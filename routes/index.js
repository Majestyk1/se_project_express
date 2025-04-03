const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingItems");

const likeRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.use("/:itemId/likes", likeRouter);

module.exports = router;
