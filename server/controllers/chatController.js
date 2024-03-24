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

const fetchChat = asyncHandler(async (req, res) => {
  try {
    chats
      .find({
        $or: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { isGroupChat: true },
        ],
      })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.error(error);
    res.status(400).send("Error fetching chat");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send("Please enter group name and users");
  }
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send("Please add more than 2 user to the group");
  }
  //   users.push(req.user);
  try {
    const groupChat = await chats.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await chats
      .findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).send(fullGroupChat);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating group chat");
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatID, name } = req.body;
  if (!chatID || !name) {
    return res.status(400).send("Please enter group name and users");
  }
  const updatedChat = await chats
    .findByIdAndUpdate(chatID, { chatName: name }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    return res.status(400).send("Error renaming group chat");
  } else {
    res.status(200).send(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatID, userID } = req.body;
  if (!chatID || !userID) {
    return res.status(400).send("Please enter group name and users");
  }
  const added = await chats
    .findByIdAndUpdate(chatID, { $push: { users: userID } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!added) {
    return res.status(400).send("Error adding user to group chat");
  } else {
    res.status(200).send(added);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatID, userID } = req.body;
  if (!chatID || !userID) {
    return res.status(400).send("Please enter group name and users");
  }
  const removed = await chats
    .findByIdAndUpdate(chatID, { $pull: { users: userID } }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removed) {
    return res.status(400).send("Error removing user from group chat");
  } else {
    res.status(200).send(removed);
  }
});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
