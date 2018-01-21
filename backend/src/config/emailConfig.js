export default {
  swEmail: process.env.REACT_APP_CLIENT_ADDRESS,
  mailstrap: {
    host: process.env.REACT_APP_MT_HOST,
    port: process.env.REACT_APP_MT_PORT,
    auth: {
      user: process.env.REACT_APP_MT_USER,
      pass: process.env.REACT_APP_MT_PASS,
    },
    resetPasswordClientRoute: `${process.env.REACT_APP_CLIENT_ADDRESS}/${
      process.env.REACT_APP_RESET_PASSWORD_ROUTE
    }`,
  },
};
