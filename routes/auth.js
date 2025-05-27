const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();


router.get("/register", (req, res) => {
  res.render("register");
});


router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashedPassword });
  res.redirect("/login");
});


router.get("/login", (req, res) => {
  res.render("login");
});

// Handle Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect("/feedback");
  } else {
    res.send("Invalid credentials");
  }
});

// router.post("/logout", ())

module.exports = router;
