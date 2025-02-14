const express = require("express");
const router = express.Router();
const { addParticipant } = require("../controllers/participantController");

router.post("/register", addParticipant);

module.exports = router;