const express = require("express");
const router = express.Router();
const { getTime, updateTime } = require("../controllers/time.controller.js");

router.get('/', getTime);

router.put('/time', updateTime);

// router.put('/:time', (req, res) => {
//     res.status(200).json({message: `Update Time: ${req.params.time}`})
// });

// router.route('/').get(protect, getGoals).post(protect, setGoal);
// router.post('/set', loginUser)

// router.route('/').get(protect, getGoals).post(protect, setGoal);
// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
