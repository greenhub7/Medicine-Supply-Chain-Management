const express = require("express");
const router = express.Router();
const { addParticipant, getAllParticipants } = require("../controllers/participantController");

router.post("/register", addParticipant);
router.get("/", getAllParticipants);

module.exports = router;