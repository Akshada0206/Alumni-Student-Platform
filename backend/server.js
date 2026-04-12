const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/database")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/match", require("./routes/match"));
app.use("/api/request", require("./routes/request"));
app.use("/api/opportunity", require("./routes/opportunity"));
app.use("/api/analytics", require("./routes/analytics"));

app.listen(5000, () => console.log("Server running on port 5000"));