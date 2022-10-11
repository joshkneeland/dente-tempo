const asyncHandler = require('express-async-handler');
const Time = require('../models/timeModel.js');

// @desc Get Time
// @route GET /
// @access private 
const updateTime = asyncHandler(async (req, res) => {
    // checkTimeVal is the default object that is returned to the front-end
    let checkTimeVal = {
        message: 'Returned checkTimeVal as normal',
        resetTimeVal: false
    };

    // Creating a new date object, in order to compare today's date to what's stored in the DB
    // The date stored in the DB refers to the last time the user visited the site
    const date = new Date();

    // Find the current instance stored in the DB
    const checkTime = await Time.findOne();
    if(checkTime?.text && date.toLocaleDateString() !== checkTime.text) {
        checkTimeVal.message = 'Updated Time Value', 
        checkTimeVal.resetTimeVal = true;
    }

    // After running the condition to compare date strings, remove the previous date instance
    // and create a new instance in the DB when the user visits the site again
    Time.deleteOne((err) => {
        try {
            console.log('Deleted previous time value from DB');
        } catch(err) {
            console.log('err: ', err);
        }
    });
    const createTime = await Time.create({
        text: date.toLocaleDateString(),
    });
    res.status(201).json(checkTimeVal);
});

module.exports = {
    updateTime,
}