const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.use(express.json({ extended: false }));

// connecting to database
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "This is root api that is hitting from server localhost that is port",
  });
});

// Routes for the APIs
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));

app.listen(PORT, () => {
  console.log(`Server has been started\nhttp://localhost:${PORT}`);
});
