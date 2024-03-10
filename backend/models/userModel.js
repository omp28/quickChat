// name,email,password,profilePic
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    profilePic: {
      type: String,
      require: true,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtIDhyILJzbIKtGprPHzRQnsB6-Mq4J716FA&usqp=CAU",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
