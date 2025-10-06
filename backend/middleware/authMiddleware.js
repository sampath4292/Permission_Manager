const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") || req.query.token;
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ msg: "Invalid token" });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
