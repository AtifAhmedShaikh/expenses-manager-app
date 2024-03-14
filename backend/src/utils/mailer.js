import nodemailer from "nodemailer";
import { SMTP_FROM_NAME, SMTP_FROM_EMAIL, SMTP_PASSWORD } from "../config/envConfig.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_FROM_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

const sendNotifyEmailToClient = async ({ sendTo, title, message }) => {
  try {
    const response = await transporter.sendMail({
      from: `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
      // to: sendTo,
      to: "atifahmad2219@gmail.com", //TODO: replace it to actual user email
      subject: title,
      text: message,
    });
    return response?.accepted?.length > 0;
    // if accepted length greater then zero means email successfully sended
  } catch (error) {
    console.log("Something went wrong while sending Email to client ");
    return null;
  }
};

export { sendNotifyEmailToClient };
