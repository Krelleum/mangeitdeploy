const mongoose = require('mongoose');

const timestampSchema = mongoose.Schema({
    mofirst:{type: Number, default: 0},
    mosecond: { type: Number, default: 0 },
    mothird: { type: Number, default: 0 },
    tuefirst: { type: Number, default: 0 },
    tuesecond: { type: Number, default: 0 },
    tuethird: { type: Number, default: 0 },
    wedfirst: { type: Number, default: 0 },
    wedsecond: { type: Number, default: 0 },
    wedthird: { type: Number, default: 0 },
    thurfirst: { type: Number, default: 0 },
    thursecond: { type: Number, default: 0 },
    thurthird: { type: Number, default: 0 },
    frifirst: { type: Number, default: 0 },
    frisecond: { type: Number, default: 0 },
    frithird: { type: Number, default: 0 },
});

module.exports = mongoose.model('TimeStamp', timestampSchema);