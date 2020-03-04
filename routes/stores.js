const express = require('express');
const router = express.Router();
const { getstores } = require('../controllers/stores');

router.route('/').get(getstores);

module.exports = router;