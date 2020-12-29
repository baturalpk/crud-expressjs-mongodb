var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('IT`S A RESPONSE @@@');
});

module.exports = router;
