const mongoose = require('mongoose');

const inboxSchema = mongoose.Schema({
    inboxid: mongoose.Schema.Types.ObjectId,
    userid: mongoose.Schema.Types.ObjectId,
    ownername: String,
    messages: { type: Array, timesended: { type: Date, default: Date.now }, receiverinbox: { type: mongoose.Schema.Types.ObjectId }, receiverid: { type: mongoose.Schema.Types.ObjectId }, senderid: {type: mongoose.Schema.Types.ObjectId}, senderName: {type: String}, messagetext: {type: String}, messageid: {type: mongoose.Schema.Types.ObjectId}}
    
});

module.exports = mongoose.model('Inbox', inboxSchema);