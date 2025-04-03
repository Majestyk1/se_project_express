const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  getClothingItemById,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);

router.post("/", createClothingItem);

router.delete("/:itemId", getClothingItemById);

module.exports = router;
