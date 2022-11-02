const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentsController");

//enlace de routes

router.get("/", studentController.getS);
router.get("/:id", studentController.getById);
router.delete("/:id", studentController.deleteById);
router.put("/:id", studentController.update);
router.post("/", studentController.create);

module.exports = router;
