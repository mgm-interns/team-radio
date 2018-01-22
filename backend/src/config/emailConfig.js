export default {
  swEmail: process.env.CLIENT_ADDRESS,
  mailstrap: {
    host: process.env.MT_HOST,
    port: process.env.MT_PORT,
    auth: {
      user: process.env.MT_USER,
      pass: process.env.MT_PASS,
    },
    resetPasswordClientRoute: `${process.env.CLIENT_ADDRESS}/${
      process.env.RESET_PASSWORD_ROUTE
    }`,
  },
};
