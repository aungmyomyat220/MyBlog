// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')
const msg = {
  to: 'war.wnn@example.com', // Change to your recipient
  from: 'aungmyomyat874@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })