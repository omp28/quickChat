const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./middleware/mongoose");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running suceessfully..");
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;
console.log("PORT", PORT);
app.listen(PORT, console.log(`Server started on port ${PORT}`));
