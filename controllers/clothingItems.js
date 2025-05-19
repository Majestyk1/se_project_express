const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");
const ForbiddenError = require("../utils/errors/ForbiddenError");

const {
  DOCUMENT_NOT_FOUND_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  SERVER_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
} = require("../utils/errors");

const getClothingItems = (req, res, next) => {
  return ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  if (!name || !weather || !imageUrl) {
    return next(new BadRequestError("Missing required fields"));
  }
  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      return res.status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }

      if (item.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You are not allowed to delete this item")
        );
      }

      return item.deleteOne().then(() => {
        return res.send({ message: "Item deleted successfully" });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
