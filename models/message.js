var mongoose = require('mongoose');
var messageSchema = new mongoose.Schema({
    from: String,
    date: { type: Date, required: true},
    subject: { type: String, required: false },
    body: { type: String, required: true },
    read : {type : Boolean, default : false}
});

messageSchema.statics.findUnreadMessages = function(callback) {
  return this.find({ read: false }, callback);
};

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;