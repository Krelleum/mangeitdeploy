const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId},
    username: {type: String, required: true},
    password: {type: String, required: true},
    useremail: {type: String},
    userphone: {type: String},
    createdorders: {type: Array},
    fulfilledorders: {type: Array},
    commentedorders: {type: Array},
    commentid:Array,
    inboxid: {type: mongoose.Schema.Types.ObjectId},
    timesignedup: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', userSchema);