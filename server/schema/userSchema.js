const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_name: { type: String },
    user_email: { type: String },
    user_password: { type: String },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
