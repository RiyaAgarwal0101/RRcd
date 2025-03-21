const express = require('express');
const router = express.Router();
const { claimCoupon,  addCoupon, getCoupons } = require('../controllers/couponController');
// const ClaimHistory = require('../models/claimHistoryModel');
router.post('/claim', claimCoupon);
router.post('/coupons', addCoupon); 
router.get('/coupons', getCoupons);
module.exports = router;