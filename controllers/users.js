const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");

const {
  SERVER_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  DOCUMENT_NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email) {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: "You must enter an email" });
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const error = new Error("User already exists");
        error.code = CONFLICT_ERROR_CODE;
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(201).json(userData);
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      if (err.code === CONFLICT_ERROR_CODE) {
        return res
          .status(CONFLICT_ERROR_CODE)
          .send({ message: "User already exists" });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(200).json(userData);
    })
    .catch((err) => {
      console.error(`Error ${err.name} with the message ${err.message}`);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR_CODE)
          .send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: "You must enter an email and password" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(`Error ${err.name} with the message ${err.message}`);
      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED_ERROR_CODE)
          .send({ message: err.message });
      }
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

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(`Error ${err.name} with the message ${err.message}`);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR_CODE)
          .send({ message: err.message });
      }
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateUser,
};
