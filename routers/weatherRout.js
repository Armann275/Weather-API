const express = require('express');
const router = express.Router();
const {getWeather} = require('../controller/weatherController');
router.get('/:city',getWeather);
module.exports = router
