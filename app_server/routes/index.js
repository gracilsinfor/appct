const express = require('express');
const router = express.Router();

const ctrl_home = require('../controllers/home');

/* GET home page. */
router.get('/', ctrl_home.inicio);

module.exports = router;