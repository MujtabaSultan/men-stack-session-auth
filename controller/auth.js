const User = require("../models/user.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/sign-up", (req, res, next) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmpaswword = req.body.confirmPassword;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send("ops something went wrong");
    }
    if (password !== confirmpaswword) {
      return res.send("passwords do not match");
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const payload = {
      username,
      password: hashedPassword,
    };
    const createdUser = User.create(payload);
    res.send("ty for signing");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
