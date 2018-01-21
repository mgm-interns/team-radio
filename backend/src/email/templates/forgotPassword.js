import config from '../../config/emailConfig';

export default (fromAddress, toAddress, subject = undefined, token) => ({
  from: fromAddress,
  to: toAddress,
  subject: subject || 'Reset your password',
  html: `
    <h1>Reset your password</h1>
    <p>Please click the link below to reset your password:</p>
     <a href="${config.resetPasswordClientRoute}?token=${token}">${
    config.resetPasswordClientRoute
  }?token=${token}</a>
  `,
});
