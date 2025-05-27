const express = require("express");
const Feedback = require("../models/Feedback");
const User = require("../models/User");
const router = express.Router();

// Middleware to check if admin (for now, username === "admin")
function isAdmin(req, res, next) {
  if (req.session.username === "admin") next();
  else res.redirect("/login");
}


router.get("/", isAdmin, async (req, res) => {
  const feedbacks = await Feedback.find().populate("userId");
  res.render("admin", { feedbacks });
});



router.delete("/:id", isAdmin, async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});




router.get("/edit/:id", isAdmin, async (req, res) => {
  const feedback = await Feedback.findById(req.params.id).populate("userId");
  res.render("editFeedback", { feedback });
});

router.put("/:id", isAdmin, async (req, res) => {
  await Feedback.findByIdAndUpdate(req.params.id, { content: req.body.content });
  res.redirect("/admin");
});

module.exports = router;
