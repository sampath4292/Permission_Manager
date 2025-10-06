const Request = require("../models/Request");
const User = require("../models/User");

exports.createRequest = async (req, res) => {
  try {
    const { type, details } = req.body;
    const request = new Request({ studentId: req.user._id, type, details });
    request.initFlow();
    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ studentId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// get requests assigned to approver role
exports.getPendingForApprover = async (req, res) => {
  try {
    const role = req.user.role;
    const requests = await Request.find({
      currentApprover: role,
      status: "pending",
    }).populate("studentId", "name email");
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.approve = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ msg: "Request not found" });
    if (request.status !== "pending")
      return res.status(400).json({ msg: "Cannot act on completed request" });
    if (request.currentApprover !== req.user.role && req.user.role !== "admin")
      return res
        .status(403)
        .json({ msg: "Not authorized to approve this request" });

    request.history.push({
      approverRole: req.user.role,
      approverId: req.user._id,
      action: "approved",
      comment,
    });
    request.advance();
    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.reject = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ msg: "Request not found" });
    if (request.status !== "pending")
      return res.status(400).json({ msg: "Cannot act on completed request" });
    if (request.currentApprover !== req.user.role && req.user.role !== "admin")
      return res
        .status(403)
        .json({ msg: "Not authorized to reject this request" });

    request.history.push({
      approverRole: req.user.role,
      approverId: req.user._id,
      action: "rejected",
      comment,
    });
    request.status = "rejected";
    request.currentApprover = null;
    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
