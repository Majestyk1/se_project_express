const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new UnauthorizedError("Authorization header is missing or invalid format")
    );
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === " Token has expired") {
      return next(new UnauthorizedError("Token has expired"));
    }
    return next(new UnauthorizedError("Invalid token"));
  }
  req.user = payload;
  return next();
};
