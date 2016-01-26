var express = require('express');
var router = express.Router();
var MessageModel = require('../models/MessageModel');
var crypto = require('bcrypt');

router.get('/', function(req, res) {
  res.json({
    mew: 'meow'
  })
});

// save message for someone
router.get('/:id', function(req, res) {
  var key = req.params.key;
  console.log(key);
  MessageModel.findById(req.params.id, function(error, msg) {
    var salt = crypto.genSaltSync(10);
    var hash = crypto.hashSync(msg.msg, salt);
    console.log(hash);
    if (msg) {
      if (crypto.compareSync(msg[key], hash) == true) {
        res.json(msg);
      } else {
        res.json({
          message: 'Your key did not work.'
        })
      }
    }
  });
});

// get message from someone
router.post('/', function(req, res) {
  if (req.body) {
    var sender = req.body.sender
    var msg = req.body.message;
    var recipient = req.body.recipient;
    var key = req.body.key;
    var salt = crypto.genSaltSync(10);

    MessageModel.create({
      sender: sender,
      message: msg,
      recipient: recipient,
      key: crypto.hashSync(req.body.message, salt)
    }, function(err, msg) {
      if (err) throw new Error(err);
      console.log(msg);
      res.json(msg);
    });
  }
});

module.exports = router;
