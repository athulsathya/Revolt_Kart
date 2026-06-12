const nodemailer = require("nodemailer");
require("dotenv").config();

const sentOTPMail = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP for password reset is: <b>${otp}</b></p>`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("OTP Sent Successfully");
    console.log(info);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sentOTPMail };
