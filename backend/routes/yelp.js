var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../schema/User');

const dbRoute =
  'mongodb+srv://dbUser:dbUserPassword@cluster0.zufin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';//*

mongoose.connect(dbRoute, { useUnifiedTopology: true });//*
let db = mongoose.connection;//*

mongoose.set('useFindAndModify', false);

db.once('open', () => console.log('connected to the database'));//*

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));//*


// yelp api stuff
const yelp = require('yelp-fusion');

const apiKey = '0v_oazq75RVevbkJlt46zl4EcjSwEqjs7r5mOatyFzO0OWKZ0f-ppE3oiSOtVc7rJvbfcG1jN9hGQfUS5yn4VkE8EQAzVqPKca4UGe-ZzKF1qI5k7pbiV5hbWOmZYHYx';
const client = yelp.client(apiKey);

router.get('/:zipcode/', function (req, res, next) {
  let searchParams = { categories: "artsandcrafts", location: req.params.zipcode };
  client.search(searchParams).then((response) => {
    var data = response.jsonBody.businesses;
    return res.json({ success: true, info: data })
  }).catch(err => {
    return res.json({ success: false, error: err });
  });
});


module.exports = router;
