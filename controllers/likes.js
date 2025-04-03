const ClothingItem = require("../models/clothingItem");
const {
  SERVER_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  DOCUMENT_NOT_FOUND_ERROR_CODE,
} = require("../utils/errors");

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(`Error ${err.name} with the message ${err.message}`);
      if (err.message === "Item not found") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR_CODE)
          .send({ message: err.message });
      } else if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid item ID." });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(`Error ${err.name} with the message ${err.message}`);
      if (err.message === "Item not found") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR_CODE)
          .send({ message: err.message });
      } else if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid item ID." });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};

module.exports = {
  likeItem,
  dislikeItem,
};
