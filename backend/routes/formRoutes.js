const express = require("express");
const router = express.Router();

const {
  createForm,
  getForms,
  getFormById,
} = require("../controllers/formController");

router.post("/", createForm);
router.get("/", getForms);
router.get("/:id", getFormById);

module.exports = router;