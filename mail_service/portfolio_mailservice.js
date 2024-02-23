const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async ({ email,subject,content }) => {
  const emailDatas = {
    from: 'aungmyomyat874@gmail.com',
    to: 'aungmyomyat3912@gmail.com',
    dynamic_template_data: {
      "email" : email,
      "subject" : subject,
      "content" : content
    },
    template_id: 'd-f8e24bbd18624f7ab0aee14e4b409d6e'
  };
  try {
    const response = await sgMail.send(emailDatas);
    console.log('Email sent successfully');
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };