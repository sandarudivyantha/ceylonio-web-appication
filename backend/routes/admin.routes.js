const express = require("express");
const router = express.Router();

const {
  addAdmin, //signup admin
  validateAdmin, //login admin
  getAdmins,
  getAdmin,
  updateAdmin,
  removeAdmin,
} = require("../controllers/admin.controllers");

router.post("/", addAdmin);
router.post("/validate", validateAdmin);
router.get("/", getAdmins);
router.get("/:id", getAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", removeAdmin);

module.exports = router;
