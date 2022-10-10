const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    text: {
        type: String
    }
}, {
  autoCreate: false
});


module.exports = mongoose.model('Time', timeSchema);