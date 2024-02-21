const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function genereateSixDigits() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

const verifyCode = genereateSixDigits();
setTimeout(() => {
  verifyCode = '';
}, 5 * 60 * 1000);
console.log(verifyCode);

const sendEmail = async (user) => {
  console.log("Work");
  const emailData = {
    from: 'aungmyomyat874@gmail.com',
    to: user.userEmail,
    dynamic_template_data: {
      "first_name" : user.userName,
      "verification_link" : "https://myblog-two-lake.vercel.app/confirm",
      "uuid" : verifyCode
    },
    template_id: 'd-76a78520ccd04bfd82f84f86713b5edb'
  };
  try {
    const response = await sgMail.send(emailData);
    console.log('Email sent successfully:', response.statusCode);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };