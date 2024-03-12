const asyncHandler = require("express-async-handler");
const chats = require("../models/chatModel");
const { find } = require("../models/userModel");
const User = require("../models/userModel");

const accessChat = async (req, res) => {
  const { userID } = req.body;
  if (!userID) {
    console.log("No user ID found");
    return res.sendStatus(400);
  }

  try {
    let isChat = await chats
      .findOne({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userID } } },
        ],
      })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat) {
      res.json(isChat);
    } else {
      const chatData = {
        chatName: "sender",
        users: [req.user._id, userID],
        isGroupChat: false,
      };

      const createdChat = await chats.create(chatData);
      res.status(200).json(createdChat);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error fetching or creating chat", error });
  }
};

module.exports = { accessChat };
