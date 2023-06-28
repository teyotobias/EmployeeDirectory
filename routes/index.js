var express = require('express');
var router = express.Router();

/* GET home page. */
//NO HOME PAGE IN THIS APP
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Welcome To SHIELD'
  });
});

module.exports = router;
