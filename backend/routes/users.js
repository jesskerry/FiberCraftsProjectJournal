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


router.get('/', function (req, res, next) {
  User.find(function (err, data) {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, info: data })

  });
});

router.post('/', function (req, res, next) {
  let newUser = new User();
  newUser.username = req.body.username;
  newUser.pwd = req.body.pwd;
  newUser.email = req.body.email;
  newUser.communities = req.body.communities;

  newUser.save((err) => {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true })
    }
  })
})

/* gets a specific user based on their username and password */
router.get('/:user/:pwd/', function (req, res, next) {
  User.find({username: req.params.user, pwd: req.params.pwd}, function (err, data) {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, info: data })

  });
});

/* gets a specific user based on their unique id */
router.get('/:userid/', function (req, res, next) {
  User.find({_id: req.params.userid}, function (err, data) {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, info: data })

  });
});

router.put('/', function (req, res, next) {
  var updates = {};
  if(req.body.user.username !== undefined) {
    updates.username = req.body.user.username;
  }
  if(req.body.user.pwd !== undefined) {
    updates.pwd = req.body.user.pwd;
  }
  if(req.body.user.email !== undefined) {
    updates.email = req.body.user.email;
  }
  if(req.body.user.communities !== undefined) {
    updates.communities = req.body.user.communities;
  }
  if(req.body.user.projects !== undefined) {
    updates.projects = req.body.user.projects;
  }
  console.log("updates: " + updates.projects);
  console.log("id: " + req.body.userid);

   User.updateOne({_id: req.body.userid}, updates, (err) => {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true })
    }
  })

})


module.exports = router;
