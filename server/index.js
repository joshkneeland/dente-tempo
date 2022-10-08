// server/index.js
const express = require("express");
const cron = require('node-cron');
const cors = require("cors");

// Express
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

cron.schedule('* * * * * *', () => {
  console.log('running a task every second');
});

// RUNS CRON JOB EVERY THREE SECONDS
// cron.schedule('*/3 * * * * *', () => {
//   console.log('running a task every second');
// });

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// app.get("/second", (req, res) => {
//   res.render('client/src/index'); 
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
