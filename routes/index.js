const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'A test environment for basic CRUD operations...', ip: req.ip.substr(7) });
});

module.exports = router;