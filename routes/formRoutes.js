const express = require("express");
const router = express.Router();
const formsController = require("../controllers/formsController");

router.post("/", formsController.addForm);
router.get("/", formsController.getForms);
router.get("/:id", formsController.getForm);
router.put("/:id", formsController.updateForm);

module.exports = router;
