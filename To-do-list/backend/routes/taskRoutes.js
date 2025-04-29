const { getTasks, createTask } = require("../controllers/taskController");
const express = require("express");

const router = express.Router();

router.get("/",getTasks);
router.post("/new",createTask);

module.exports = router;