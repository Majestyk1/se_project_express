const ClothingItem = require("../models/clothingItem");

const {
  DOCUMENT_NOT_FOUND_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  SERVER_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  if (!name || !weather || !imageUrl) {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: "Missing required fields" });
  }
  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR_CODE)
          .send({ message: "Item not found" });
      }

      if (item.owner.toString() !== req.user._id) {
        return res
          .status(FORBIDDEN_ERROR_CODE)
          .send({ message: "You are not allowed to delete this item" });
      }

      return item
        .deleteOne()
        .then(() => res.send({ message: "Item deleted successfully" }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error occurred while deleting the item" });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
