const express = require('express');
const router = express.Router();
const {adminLogin, addCoupon, viewCoupons } = require('../controllers/adminController');
router.post('/login', adminLogin);
router.post('/add', addCoupon);
router.get('/view', viewCoupons);

module.exports = router;