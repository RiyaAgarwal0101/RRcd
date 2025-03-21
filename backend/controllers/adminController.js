const Coupon = require('../models/couponModel');
 exports.addCoupon = async (req, res) => {
 const { code } = req.body;
 const newCoupon = new Coupon({ code });
 await newCoupon.save();
 res.status(201).json({ message: "Coupon added successfully." });
 };
 exports.viewCoupons = async (req, res) => {
 const coupons = await Coupon.find();
 res.status(200).json(coupons);
 };
 
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';  
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123'; 

exports.adminLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({
      success: true,
      message: 'Login successful',
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password',
    });
  }
};
