const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async ({userEmail,userName,verificationCode}) => {
  const emailData = {
    from: 'aungmyomyat874@gmail.com',
    to: userEmail,
    dynamic_template_data: {
      "first_name" : userName,
      "email" : userEmail,
      "uuid" : verificationCode
    },
    template_id: 'd-76a78520ccd04bfd82f84f86713b5edb'
  };
  try {
    const response = await sgMail.send(emailData);
    console.log('Email sent successfully');
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };