const express = require("express");
const {createUser,loginUser,getUserById,} = require("../controller/usercontroller");
const router = express.Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.post("/getUserById", getUserById);

module.exports = router;
