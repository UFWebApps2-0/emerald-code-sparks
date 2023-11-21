// File: /api/email/controllers/Email.js
'use strict';

/**
 * Read the documentation () to implement custom controller functions
 */

console.log("in email.js");

/**
 * Sends an email to the recipient in the body of the request
 */
const send = async (ctx) => {
  try {
    // Your email sending logic goes here
    console.log("Sending email...");

    const emailOptions = {
      to: 'chaitrapeddireddy@gmail.com',
      subject: 'Test Email',
      html: '<p>This is a test email.</p>',
    };

    // Using Strapi's email service to send the email
    await strapi.plugins['email'].services.email.send(emailOptions);

    console.log("Email sent successfully.");

    ctx.send({ message: 'Email sent' });
  } catch (err) {
    console.error("Error sending email:", err);
    ctx.send({ error: 'Error sending email' });
  }
};


module.exports = { send }; // Export the send function as a named export
