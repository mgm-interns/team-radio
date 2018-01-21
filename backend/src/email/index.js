import nodemailer from 'nodemailer';
import config from '../config/emailConfig';

export default nodemailer.createTransport(config.mailstrap);
