// utils/sendMail.js
const nodemailer = require('nodemailer');

const sendResetEmail = async (to, resetLink) => {

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'zahidvicky9693@gmail.com',
      pass: 'rjea daev qepi ehpg', 
    },
  });

  const mailOptions = {
    from: '"Your App" <zahidvicky9693@gmail.com>',
    to,
    subject: 'Password Reset Link',
    html: `<p>Click the link below to reset your password:</p>
           <a href="${resetLink}">${resetLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
