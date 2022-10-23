// server/index.js
const express = require("express");
const app = express();
const cors = require("cors");
const asyncHandler = require("express-async-handler");
require("dotenv").config({ path: "../.env" });
const PORT = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(cors());
app.use(express.json());
const connectDB = require("./config/db.js");
const { updateTimeValue } = require("./controllers/time.controller.ts");

const Time =  require("./models/timeModel.js");

app.use("/", require("./routes/timeRoutes.js"));

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
