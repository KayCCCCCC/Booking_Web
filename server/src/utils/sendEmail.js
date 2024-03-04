const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const inlineBase64 = require('nodemailer-plugin-inline-base64');

dotenv.config();

const sendEmail = async (email, OTPCode) => {
    try {
        // const user = process.env.MAIL_ACCOUNT
        // const pass = process.env.MAIL_PASSWORD
        // console.log(user, pass)
        // return
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' })); // gửi ảnh qua email

        const result = await transporter.sendMail({
            from: process.env.MAIL_ACCOUNT,
            to: email,
            subject: "OTP Verify gmail",
            html: `
                <div style="max-width: 400px; margin: 50px auto; padding: 30px; text-align: center; font-size: 120%; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); position: relative;">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDn7YDq7gsgIdHOEP2_Mng6Ym3OzmvfUQvQ&usqp=CAU" alt="Noto Image" style="max-width: 100px; height: auto; display: block; margin: 0 auto; border-radius: 50%;">
                    <h2 style="text-transform: uppercase; color: #3498db; margin-top: 20px; font-size: 28px; font-weight: bold;">Welcome to WebBooking</h2>
                    <div style="font-size: 18px; color: #555; margin-bottom: 30px;">Your OTP Code is: <span style="font-weight: bold; color: #e74c3c;">${OTPCode}</span></div>
                    <p style="color: #888; font-size: 14px;">Powered by WebBooking</p>
                </div>
            `,
        });

        // console.log("Email sent successfully:", result);
        return result;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};

module.exports = sendEmail
