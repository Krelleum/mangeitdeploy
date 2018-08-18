const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderid: mongoose.Schema.Types.ObjectId,
    customerid: mongoose.Schema.Types.ObjectId,
    userid: mongoose.Schema.Types.ObjectId,
    orderstatus: {type: String, default:'open'},
    ordertype: {type: String, default: 'noappointment'},
    orderheading: String,
    ordershort: String,
    orderdescription: String,
    orderpriority: {type: String, default:'low'},
    commentid: Array,
    username: String,
    customername: String,
    timecreated: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Order', orderSchema);