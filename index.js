const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");

const app = express();


app.get('/', (req, res) => {
  res.send('Welcome to the Feedback App!');
});
// DB connection

mongoose.connect("mongodb://localhost:27017/feedbackApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to local MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/feedback_app" })
}));

// Routes
app.use("/", require("./routes/auth"));
app.use("/feedback", require("./routes/feedback"));
app.use("/admin", require("./routes/admin"));

app.listen(3000, () => console.log("Server started on http://localhost:3000"));
