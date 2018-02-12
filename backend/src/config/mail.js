var mail = {};

mail.driver = process.env.MAIL_DRIVER;
mail.host   = process.env.MAIL_HOST;
mail.from   = {
    address : process.env.MAIL_ADDRESS,
    name    : process.env.MAIL_NAME,
};

module.exports = mail;