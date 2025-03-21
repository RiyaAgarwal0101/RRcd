const Coupon = require('../models/couponModel');
const ClaimHistory = require('../models/claimHistoryModel');
exports.claimCoupon = async (req, res) => {
  const { ipAddress, browserSession } = req.body;

  try {
    const recentClaim = await ClaimHistory.findOne({ 
      ipAddress, 
      browserSession, 
      claimedAt: { $gte: new Date(Date.now() - 300000) } 
    });

    if (recentClaim) {
      return res.status(429).json({ message: "You can claim only once every 5 minutes." });
    }
    const coupon = await Coupon.findOne({ isClaimed: false }).sort({ _id: 1 });
    if (!coupon) {
      return res.status(404).json({ message: "No coupons available." });
    }
    coupon.isClaimed = true;
    const ipResponse = await axios.get('https://api64.ipify.org?format=json');
    coupon.claimedBy = ipResponse.data.ip;
    await coupon.save();
    await ClaimHistory.create({
      ipAddress, 
      browserSession,
      claimedAt: new Date()
    });
  
    res.status(200).json({ message: `Coupon claimed successfully. Code: ${coupon.code}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
exports.addCoupon = async (req, res) => {
  try {
      const { code } = req.body;

      if (!code ) {
          return res.status(400).json({ message: 'Field are required' });
      }

      const newCoupon = new Coupon({ code });
      await newCoupon.save();

      res.status(201).json({ message: 'Coupon added successfully' });
  } catch (error) {
      console.error('Error adding coupon:', error);
      res.status(500).json({ message: 'Server error' });
  }
};
exports.getCoupons = async (req, res) => {
  try {
      const coupons = await Coupon.find();
      res.status(200).json(coupons);
  } catch (error) {
      console.error("Error fetching coupons:", error);
      res.status(500).json({ message: "Server error" });
  }
};
