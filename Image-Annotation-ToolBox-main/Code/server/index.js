const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const port = 3031;

const postsRouter = require("./routes/posts");

app.use(logger("dev"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/posts", postsRouter);

/**
 * Starts the Express app and listens on the specified port.
 *
 * @memberof module:app
 * @function
 * @name listen
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - The callback function to be executed on successful start.
 */
app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
