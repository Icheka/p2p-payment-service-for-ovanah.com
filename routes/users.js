var express = require('express');
const user = require('../controllers/UserController');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  user();
  res.send('respond with a resource');
});

module.exports = router;
