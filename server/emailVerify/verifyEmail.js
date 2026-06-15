const nodemailer = require("nodemailer");
require("dotenv").config();

const verifyEmail = async (token, email) => {
  try {
    console.log("verifyEmail called");
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
    console.log("Sending email to:", email);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 30000,
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Hi! There,

Please follow the link to verify your email:

${process.env.FRONTEND_URL}/verify/${token}`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("Email Sent Successfully");
    console.log(info);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

module.exports = { verifyEmail };