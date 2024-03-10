const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running suceessfully..");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  console.log("your id ", req.params.id);
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 3000;
console.log("PORT", PORT);
app.listen(PORT, console.log(`Server started on port ${PORT}`));
