require('dotenv').config({ path: '../.env' });
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

//define the plugins
console.log("printing env variables");
console.log(process.env)
console.log(process.env.EMAIL_SMTP_USER);
console.log(process.env.EMAIL_SMTP_PASS);
process.env.EMAIL_SMTP_USER = "";
process.env.EMAIL_SMTP_PASS = "";


module.exports = () => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS,
      },
    },
    settings: {
      defaultFrom: 'casmm.help@gmail.com',
      defaultReplyTo: 'no-reply@casmm.org',
    },
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
    integrations: [new Sentry.Integrations.Http({ tracing: true })],
    tracesSampleRate: 1.0,
  },
});
