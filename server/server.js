const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./middleware/mongoose");
const userRoutes = require("./routes/userRoutes");
const { notfound, errorHandler } = require("./middleware/error");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");

dotenv.config();
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running suceessfully..");
});

app.use(express.json()); //to accept json data in the body

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);

app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
console.log("PORT", PORT);
app.listen(PORT, console.log(`Server started on port ${PORT}`));
