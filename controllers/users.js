const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");
const ConflictError = require("../utils/errors/ConflictError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!email) {
    return next(new BadRequestError("Valid email is required"));
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new ConflictError("User already exists"));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      if (!hash) return;
      return User.create({
        name,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      if (!user) return;
      const userData = user.toObject();
      delete userData.password;
      res.status(201).json(userData);
    })
    .catch((err) => {
      console.error("Error creating user:", err);

      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }

      if (err.code === 11000) {
        return next(new ConflictError("User already exists"));
      }

      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .orFail()
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(200).json(userData);
    })
    .catch((err) => {
      console.error(`Error ${err.name} with the message ${err.message}`);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID."));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
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
        return next(new UnauthorizedError(err.message));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.error(`Error ${err.name} with the message ${err.message}`);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateUser,
};
