const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commentid: mongoose.Schema.Types.ObjectId,
    orderid: mongoose.Schema.Types.ObjectId,
    customerid: mongoose.Schema.Types.ObjectId,
    userid: mongoose.Schema.Types.ObjectId,
    commenttext: String,
    customername: String,
    username:String,
    timecreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);