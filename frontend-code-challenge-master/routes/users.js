var express = require('express');
var router = express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();

var users = require('../init_data.json').data;
var curId = _.size(users);

/* GET users listing. */
router.get('/', function(req, res) {
  res.json(_.toArray(users));
});

/* Create a new user */
router.post('/', function(req, res) {
  var user = req.body;
  user.id = curId++;
  if (!user.state) {
    user.state = 'pending';
  }
  users[user.id] = user;
  log.info('Created user', user);
  res.json(user);
});

/* Get a specific user by id */
router.get('/:id', function(req, res, next) {
  var user = users[req.params.id];
  if (!user) {
    return next();
  }
  res.json(users[req.params.id]);
});

/* Query for user by first name */
router.get('/query/f/:firstName', function(req, res, next) {
  var { firstName } = req.params;
  var matchingUsers = [];

  var usersKeys = Object.keys(users);

  usersKeys.forEach(key => {
    if(users[key].firstName.toLowerCase().includes(firstName.toLowerCase())) {
      matchingUsers.push(users[key])
    }
  });

  res.json(matchingUsers);
})

/* Query for user by last name */
router.get('/query/l/:lastName', function(req, res, next) {
  try {
    var { lastName } = req.params;
    var matchingUsers = [];

    var usersKeys = Object.keys(users);

    usersKeys.forEach(key => {
      if(users[key].lastName.toLowerCase().includes(lastName.toLowerCase())) {
        matchingUsers.push(users[key])
      }
    });

    res.json(matchingUsers);
  } catch(e) {
    console.log(e)
  }
})

/* Query for user by email */
router.get('/query/e/:email', function(req, res, next) {
  var { email } = req.params;
  var matchingUsers = [];

  var usersKeys = Object.keys(users);

  usersKeys.forEach(key => {
    if(users[key].email.toLowerCase().includes(email.toLowerCase())) {
      matchingUsers.push(users[key])
    }
  });

  console.log(matchingUsers);
  res.json(matchingUsers);
})

/* Delete a user by id */
router.delete('/:id', function(req, res) {
  var user = users[req.params.id];
  delete users[req.params.id];
  res.status(204);
  log.info('Deleted user', user);
  res.json(user);
});

/* Update a user by id */
router.put('/:id', function(req, res, next) {
  var user = req.body;
  console.log('user:', user)
  if (user.id != req.params.id) {
    return next(new Error('ID paramter does not match body'));
  }
  users[user.id] = user;
  log.info('Updating user', user);
  res.json(user);
});


module.exports = router;