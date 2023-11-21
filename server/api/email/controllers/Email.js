// File /api/email/controllers/Email.js
'use strict';

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  /**
   * Sends an email to the recipient in the body of the request
   */
  send: async (ctx) => {
    // ensure request was not sent as formdata
    if (ctx.is('multipart'))
      return ctx.badRequest('Multipart requests are not accepted!', {
        error: 'ValidationError',
      });

    // ensure the request has the right number of params
    const params = Object.keys(ctx.request.body).length;
    if (params == 3) {
      console.log('params == 3');
      console.log(ctx.request.body);
      const { name, email, studyID } = ctx.request.body;
      if (!name || !email || !studyID) {
        console.log('!name || !email || !studyID');
        return ctx.badRequest(
          'A name, email and studyID must be provided!',
          { error: 'ValidationError' }
        ); 
      } else {
        console.log('else');
        try {
          console.log('try');
          const emailOptions = {
            to: email,
            subject: 'Invitation to participate in a study',
            html: `
            <h3>Dear Researcher ${name}, </h3>
            <p>You have been invited to participate in study ${studyID}.</p>
            <p>Please visit <a href='https://casmm.org'>casmm.org</a> to download the app and enter the study ID to participate.</p>
            <p>Thank you!</p>
            <p>CASMM Team</p>
            `,
          };
          console.log('emailOptions');
          console.log(emailOptions);
          await strapi.plugins['email'].services.email.send(emailOptions);
          strapi.log.debug(`Email sent to ${email}`);
          ctx.send({ message: 'Email sent' });
        } catch (err) {
          strapi.log.error(`Error sending email to ${email}, `, err);
          ctx.send({ error: 'Error sending email' });
        }
      } 
    } else if (params !== 5)
      return ctx.badRequest('Invalid number of params!', {
        error: 'ValidationError',
      });


    // validate the request
    const { description, steps, name, email, systemInfo } = ctx.request.body;
    if (!description || !steps || !name || !email || !systemInfo)
      return ctx.badRequest(
        'A description, steps, name, email and systemInfo must be provided!',
        { error: 'ValidationError' }
      );

    try {
      const emailOptions = {
        to: 'chaitra2304@icloud.com',
        subject: 'Bug Report',
        html: `
        <h3>Description of the bug: </h3>
        <p>${description}<p>
        <h3>Steps to reproduce: </h3>
        <p>${steps}<p>
        <h3>Reported by: </h3>
        <p>${name} <p> <a href='mailto: ${email}'>(${email})</a>
        <h3>Captured in: </h3>
        <p>${systemInfo}</p>
        `,
      };
      await strapi.plugins['email'].services.email.send(emailOptions);
      strapi.log.debug(`Email sent to casmm.help@gmail.com`);
      ctx.send({ message: 'Email sent' });
    } catch (err) {
      strapi.log.error(`Error sending email to casmm.help@gmail.com, `, err);
      ctx.send({ error: 'Error sending email' });
    }
  }
};
