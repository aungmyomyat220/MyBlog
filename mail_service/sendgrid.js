const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');
dotenv.config();
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
sgMail.setApiKey('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')
const sixDigits = require('../middleware/genereateSixDigits')

const sendEmail = async (user) => {
  const emailData = {
    from: 'aungmyomyat874@gmail.com',
    to: user.userEmail,
    dynamic_template_data: {
      "first_name" : user.userName,
      "verification_link" : "https://myblog-two-lake.vercel.app/confirm",
      "uuid" : sixDigits
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