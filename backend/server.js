require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const couponRoutes = require('./routes/couponRoutes');
const adminRoutes = require('./routes/adminRoutes');
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/coupons', couponRoutes);
app.use('/api/admin', adminRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

