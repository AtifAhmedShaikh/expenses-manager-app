import nodemailer from "nodemailer";
import { SMTP_FROM_EMAIL, SMTP_PASSWORD } from "../config/envManager.js";

import path from "path";
import hbs from "nodemailer-express-handlebars";

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("src/views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("src/views"),
  extName: ".hbs",
};

// create mailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_FROM_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

// use hbs template
transporter.use("compile", hbs(handlebarOptions));

// utility function to send email to user based on provided mail options
const sendEmail = async mailOptions => {
  try {
    const response = await transporter.sendMail(mailOptions);
    return response?.accepted?.length > 0;
  } catch (error) {
    console.log("Something went wrong while sending Invitation Email to owner ", error);
    return null;
  }
};

export { sendEmail };
