const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatID } = req.body;
  if (!content || !chatID) {
    res.status(400);
    throw new Error("Message and ChatID are required");
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatID,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name,email",
    });

    await Chat.findByIdAndUpdate(req.body.chatID, {
      latestMessage: message,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to send message");
  }
});

const getallMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("chat");
    console.log(messages);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to fetch messages");
  }
});

module.exports = { sendMessage, getallMessages };
