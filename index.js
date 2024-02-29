const express = require("express");
const app = express();
const body = require("body-parser");
const helmet = require('helmet');
const path = require("path");
const routes = require('./router/routes');
const db = require('./db'); // Import the MongoDB connection file

// set the views directory
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(body.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Include routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
