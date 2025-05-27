const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();


function isAuthenticated(req, res, next) {
  if (req.session.userId) next();
  else res.redirect("/login");
}

router.get("/", isAuthenticated, async (req, res) => {
  const feedback = await Feedback.findOne({ userId: req.session.userId });
  res.render("feedback", { feedback });
});

router.post("/", isAuthenticated, async (req, res) => {
  const existing = await Feedback.findOne({ userId: req.session.userId });
  if (!existing) {
    await Feedback.create({ userId: req.session.userId, content: req.body.content });
  }
  res.redirect("/feedback");
});


router.put("/", isAuthenticated, async (req, res) => {
  await Feedback.findOneAndUpdate({ userId: req.session.userId }, { content: req.body.content });
  res.redirect("/feedback");
});

module.exports = router;
