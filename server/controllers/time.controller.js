const asyncHandler = require('express-async-handler');
const Time = require('../models/timeModel.js');

// @desc Get Time
// @route GET /
// @access private 
const getTime = asyncHandler(async (req, res) => {
    const time = await Time.find();

    res.status(200).json({message: 'Get Time from controller!', time: time});
});

// @desc Update Time
// @route PUT /time
// @access private 
const updateTime = asyncHandler(async (req, res) => {
    // if(!req.body.text) {
    //     res.status(400).json({message: 'Please add a text field'});
    //     throw new Error('Please add a text field');
    // }

    const date = new Date();
    const createTime = await Time.create({
        text: date.toLocaleTimeString(),
    });

    // res.status(200).json(createTime);

    res.status(200).json({message: `Set Time from controller: ${date.toLocaleTimeString()}`})
});

module.exports = {
    getTime,
    updateTime,
}