import React from 'react';
import axios from 'axios';
export default function CouponClaim() {
 const [message, setMessage] = React.useState("");
 const claimCoupon = async () => {
     try {
        const ipResponse = await axios.get('https://api64.ipify.org?format=json');
        const ipAddress = ipResponse.data.ip;
        const browserSession = localStorage.getItem("sessionID") || Date.now().toString();
        localStorage.setItem("sessionID", browserSession);

         const response = await axios.post('http://localhost:5000/api/coupons/claim', {
             ipAddress, 
             browserSession, 
         });
         setMessage(response.data.message);
     } catch (error) {
         setMessage(error.response.data.message);
     }
 };
 return (
     <div>
         <button onClick={claimCoupon}>Claim Coupon</button>
         <p>{message}</p>
     </div>
 );
}