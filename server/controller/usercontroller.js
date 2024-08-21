const userModel = require("../schema/userSchema");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { error } = require("console");

exports.createUser = async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  try {
    const Exist = await userModel.findOne({ user_email });
    if (Exist) {
      return res.status(400).send({ message: "Already Available" });
    } else {
      const user = await userModel.create({
        user_name,
        user_email,
        user_password: bcrypt.hashSync(user_password, 10),
        refresh_token:crypto.randomBytes(64).toString("hex"),
      });
      if (user) {
        return res.status(201).send({
          message: "created",
          data: { id: user._id, email: user.user_email },
        });
      }
      return res.status(400).send({ message: "not created" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
exports.loginUser = async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    const Exist = await userModel.findOne({ user_email });
    if (Exist) {
      const passMatch = bcrypt.compareSync(user_password, Exist.user_password);
      if (passMatch) {
        const token = jwt.sign({ id: Exist._id }, "hello", { expiresIn: "5m" });
        return res
          .status(200)
          .send({ message: "success", data: token, id: Exist._id });
      }
    } else {
      return res.status(400).send({ message: "not match" });
    }
    return res.status(400).send({ message: "not available" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await userModel.findById({ _id });
    if (user) {
      return res.status(200).send({ message: "Available", data: user });
    }
    return res.status(400).send({ message: "Not Available" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
