// sending message and receiv all the previous messages
const express = require("express");
const { sendMessage } = require("../controllers/messageController");
const { getallMessages } = require("../controllers/messageController");
const router = express.Router();
const { protect } = require("../middleware/auth");

// sending Message
// to fetch all the messages in chat

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, getallMessages);

module.exports = router;
