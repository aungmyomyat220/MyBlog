const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async ({userName,userEmail}) => {
  const emailData = {
    from: 'aungmyomyat874@gmail.com',
    to: userEmail,
    dynamic_template_data: {
      "first_name" : userName,
      "verification_link" : "https://my-blog-server-rho.vercel.app/users",
      "uuid" : Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
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