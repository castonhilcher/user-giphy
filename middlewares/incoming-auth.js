module.exports = (req, res, next) => {
  //This middleware checks to
  // 1. Make sure the request has a user
  // 2. Makes sure the id passed in the URL matches the request user

  if (!req.user) {
    res.sendStatus(401);
  } else if (req.user.id !== req.params.userId) {
    res.sendStatus(403);
  } else {
    //continue to the next middleware/request handler
    next();
  }
};
