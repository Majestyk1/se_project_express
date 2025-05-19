module.exports = (err, req, res, next) => {
  console.error("Error Name:", err.name);
  console.error("Error Message:", err.message);
  console.error("Error Stack:", err.stack);
  console.error(err);
  // if an error has no status, set it to 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    // check the status and display a message based on it
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};
