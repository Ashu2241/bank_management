require("dotenv").config();
const express = require("express");

require('./config/modelConfig');
const mainRouter = require('./routes/mainRouter');


const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use('/', mainRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server running on port number : ${PORT}`);
});
