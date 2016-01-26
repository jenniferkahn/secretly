// give all the things all the secrets to use!
require('dotenv').load();

var mongoose = require('mongoose');
var connectionString = process.env.DB || process.env.MONGOLAB_URI;

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
  console.log('secretsssssssss');
});

mongoose.connection.on('error', function(err) {
  console.log(err);
});

mongoose.connection.on('disconnected', function() {
  console.log('jen left the lid of the secrets open');
});
