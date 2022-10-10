const mongoose = require("mongoose");

const timeSchema = ({
    text: {
        type: String
    }
});

module.exports = mongoose.model('Time', timeSchema);