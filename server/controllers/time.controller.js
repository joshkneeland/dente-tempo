const asyncHandler = require('express-async-handler');
const Time = require('../models/timeModel.js');

// @desc Get Time
// @route GET /
// @access private 
const updateTime = asyncHandler(async (req, res) => {
    
    const date = new Date();

    Time.deleteOne((err) => {
        console.log('Removed previous time value');
    });

    const createTime = await Time.create({
        text: date.toLocaleTimeString(),
    });

    res.status(201).json({message: 'Updated Time Value', time: createTime});
});

module.exports = {
    updateTime,
}