var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  sender: [String],
  message: [String],
  recipient: [String]
});

module.exports = mongoose.model('Message', schema);
