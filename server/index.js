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
// app.use(require("./routes/record"));
// get driver connection
// const dbo = require("./db/conn");
const connectDB = require("./config/db.js");

const Time =  require("./models/timeModel.js");

// const getTime = asyncHandler(async (req,res) => {
//   const time = await Time.find();

//   res.status(200).json(time);
// });

// const setTime = asyncHandler(async (req,res) => {
//   const time = await Time.find();

//   res.status(200).json(time);
// });

app.use("/", require("./routes/timeRoutes.js"));

app.use(errorHandler);

connectDB();

// const cron = require('node-cron');

// cron.schedule('* * * * * *', () => {
//   console.log('running a task every second');
// });

// cron.schedule('** 13 11 * * *', () => {
//   console.log('running a task at 11:13');
// });

// RUNS CRON JOB EVERY THREE SECONDS
// cron.schedule('*/3 * * * * *', () => {
//   console.log('running a task every second');
// });

// app.get("/", (req, res) => {
//   res.json({ resetTimer: true });
// });

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api-two", (req, res) => {
  res.json({ message: "Hello from server TWO!" });
});

// app.get("/second", (req, res) => {
//   res.render('client/src/index'); 
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
