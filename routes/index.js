var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = null;

  if (req.user) {
    user = req.user;
  }

  res.render('index', { title: 'Express', user: user });
});

module.exports = router;
