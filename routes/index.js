const router = require("express").Router();

const userRouter = require("./users");
const clothingRouter = require("./clothingItems");
const likeRouter = require("./likes");

router.use("/users", userRouter);
router.use("/items", clothingRouter);
router.use("/likes", likeRouter);

module.exports = router;
