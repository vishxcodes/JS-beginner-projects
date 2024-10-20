const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const client = require('twilio')(accountSid, authToken);

// In-memory OTP storage (use a database in production)
let otpStore = {};

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Send OTP
app.post('/send-otp', (req, res) => {
  const phone = req.body.phone;
  const otp = generateOtp();
  otpStore[phone] = { otp, expires: Date.now() + 300000 }; // OTP expires in 5 mins
  
  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: '+1234567890',
      to: phone,
    })
    .then(() => res.send('OTP sent!'))
    .catch(err => res.status(500).send('Error sending OTP'));
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  const storedOtp = otpStore[phone];

  if (storedOtp && storedOtp.otp === otp && storedOtp.expires > Date.now()) {
    res.send('OTP verified successfully');
  } else {
    res.status(400).send('Invalid or expired OTP');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
