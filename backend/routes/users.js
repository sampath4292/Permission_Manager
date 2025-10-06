const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const {
  getMe,
  listUsers,
  updateRole,
} = require("../controllers/userController");

router.get("/me", auth, getMe);
router.get("/", auth, allowRoles("admin"), listUsers);
router.put("/:userId/role", auth, allowRoles("admin"), updateRole);

module.exports = router;
