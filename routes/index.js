var express = require('express');
var router = express.Router();

/* GET home page. */
//NO HOME PAGE IN THIS APP
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '',
    isHomePage: true //indicates home page for title styling
  });
});

module.exports = router;
