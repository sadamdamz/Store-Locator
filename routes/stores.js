const express = require('express');
const router = express.Router();
const { getstores, addstores } = require('../controllers/stores');

router.route('/').get(getstores).post(addstores);

module.exports = router;