const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')


const sendEmail = async ({userName,userEmail}) => {
  const emailData = {
    from: 'aungmyomyat874@gmail.com',
    to: userEmail,
    dynamic_template_data: {
      "first_name" : userName,
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