/* packages */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

/* routes */
const users = require("./routes/api/users");
const tasks = require("./routes/api/tasks");

/* initialize express */
const app = express();

app.use(cors());

/* Parser middleware */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Bring in mongo key */
const mkey = require("./config/keys").mongoURI;

/* passport config */
require("./config/passport")(passport);

mongoose
  .connect(mkey)
  .then(() => console.log("mongo DB connected"))
  .catch((error) => console.log(error));

app.use("/api/users", users);
app.use("/api/tasks", tasks);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.resolve(__dirname, "..", "frontend", "build");

  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(frontendBuildPath);
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
