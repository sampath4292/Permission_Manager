const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const {
  createRequest,
  getMyRequests,
  getPendingForApprover,
  approve,
  reject,
} = require("../controllers/requestController");

// student submits
router.post("/", auth, allowRoles("student"), createRequest);

// student views own
router.get("/me", auth, allowRoles("student"), getMyRequests);

// approvers get pending
router.get(
  "/pending",
  auth,
  allowRoles("advisor", "faculty", "hod", "warden", "security"),
  getPendingForApprover
);

// approve/reject
router.post("/:id/approve", auth, approve);
router.post("/:id/reject", auth, reject);

module.exports = router;
