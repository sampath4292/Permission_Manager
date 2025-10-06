const User = require("../models/User");

exports.getMe = async (req, res) => {
  res.json(req.user);
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    user.role = role;
    await user.save();
    res.json({ msg: "Role updated", user: { id: user._id, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
