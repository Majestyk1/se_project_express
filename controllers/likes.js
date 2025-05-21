const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(`Error ${err.name} with the message ${err.message}`);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID."));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(`Error ${err.name} with the message ${err.message}`);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID."));
      }
      return next(err);
    });
};

module.exports = {
  likeItem,
  dislikeItem,
};
