const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./middleware/mongoose");
const userRoutes = require("./routes/userRoutes");
const { notfound, errorHandler } = require("./middleware/error");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");
const { addToGroup } = require("./controllers/chatController");

dotenv.config();
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running suceessfully..");
});

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
console.log("PORT", PORT);
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 50000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on("setup", (userData) => {
    socket.join(userData._id); // create user room
    console.log("User Joined", userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("Room Joined" + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (message) => {
    var chat = message.chat;
    if (!chat.users) return console.log("chat.users not defined");

    // if we are sending message to a group chat than we will send message to all the users in the group other than the sender
    chat.users.forEach((user) => {
      if (user._id == message.sender._id) return;
      socket.in(user._id).emit("message received", message);
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});
