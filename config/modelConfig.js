const mongoose = require("mongoose");

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection problem", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose connected successfully");
});
