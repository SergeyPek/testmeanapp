var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

// Use local strategy
passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function (username, password, done) {
      User.findOne({
        username: username.toLowerCase()
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user || !user.authenticate(password)) {
          return done(null, false, {
            message: 'Invalid username or password'
          });
        }

        return done(null, user);
      });
    })
);

// Serialize sessions
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize sessions
passport.deserializeUser(function (id, done) {
  User.findOne({
    _id: id
  }, '-salt -password', function (err, user) {
    done(err, user);
  });
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  User.findOne({
    _id: req.params.id
  }, '-salt -password', function (err, user) {
    res.json(user);
  });
});

router.post('/signup', function(req, res, next) {
  var user = new User(req.body);
  user.provider = 'local';

  user.save(function(err) {
    if (err) {
      return res.status(400).send({message: err})
    } else {
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
          res.json(user);
      });
    }
  });
});

router.post('/signin', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function (err) {
          res.json(user);
      });
    }
  })(req, res, next);
});

module.exports = router;
