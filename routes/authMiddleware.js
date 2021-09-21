module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "Not authorized to view this page!" });
  }
};

module.exports.isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "Not authorized to view this page, you're not an admin!" });
  }
};
