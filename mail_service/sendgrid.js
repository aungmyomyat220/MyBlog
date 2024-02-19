const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

const emailData = {
  from: 'aungmyomyat874@gmail.com',
  to: 'war.wnn@gmail.com',
  content : '',
  template_id: 'd-76a78520ccd04bfd82f84f86713b5edb'
};
const sendEmail = async (emailData) => {
  try {
    const response = await sgMail.send(emailData);
    console.log('Email sent successfully:', response.statusCode);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw for proper error handling in server.js
  }
};

module.exports = { sendEmail };