const db = require("../model/index");
const sendEmail = require("../utils/sendEmail");
const { Token } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = db.user;
const Role = db.role;
const Order = db.order;
const Package = db.servicePackage;

class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: { email: email }
            });

            if (!user || !user.name)
                return res
                    .status(500)
                    .send({ message: "This account does not exist." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send({ message: "Password incorrect." });
            }

            if (user.status === "InActive") {
                return res.status(500).send({ message: "Account has been banned" });
            }

            const access_token = await Token.generateAccessToken({ id: user.id, role: user.roleId });
            const refresh_token = await Token.generateRefreshToken({ id: user.id, role: user.roleId });
            await res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
                sameSite: "none",
                secure: true,
            });
            return res.status(200).send({
                message: "Login successful",
                access_token: access_token
            });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to do somthing exceptional" });
        }
    }

    static async refresh_token(req, res, next) {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) {
                return res.status(400).json({ message: "Please login now" });
            }

            const decode = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
            if (!decode) return res.status(400).json({ message: "Please login now" });
            if (decode.id) {
                const user = await User.findByPk(decode.id, {
                    attributes: ["id", "name", "email"]
                });

                const access_token = await Token.generateAccessToken({ id: user.id });
                return res.status(200).json({ access_token, user });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to do somthing exceptional" });
        }
    }

    static async logout(req, res) {
        try {
            await res.clearCookie("refreshtoken", {
                secure: true,
                httpOnly: true,
                sameSite: "none",
            });
            return res.status(200).send({ message: "Logged out" });
        } catch (error) {
            return res.status(500).send({ message: "Logout error" });
        }
    }

    static async firstStepRegisteration(req, res) {
        try {
            const { email, password, confirmpassword, policyAccepted } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (user && !parseInt(user.otpCode)) {
                return res.status(400).json({ message: "Account already exists" });
            }
            if (password != confirmpassword) {
                return res.status(400).json({ message: "Password and ConfirmPassword is not match" });
            }

            if (policyAccepted) {

                const OTP = Math.floor(100000 + Math.random() * 900000);
                await sendEmail(email, OTP);
                const hashedPassword = await bcrypt.hash(password, 10);

                await User.create({
                    email: email,
                    otpCode: OTP,
                    password: hashedPassword,
                    roleId: 2,
                    status: "InActive",
                    typeRegister: "normal-register",
                    policyAccepted: policyAccepted
                });
            } else {
                return res.status(200).send({
                    message: "Cancel register",
                });
            }

            return res.status(200).send({
                message: "Succcess. Check your mail to get OTP code",
            });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to do something exceptional" });
        }
    }

    static async submitOTP(req, res) {
        try {
            const { email, OTPCode } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(400).json({ message: "User not found." });
            }

            if (OTPCode != user.otpCode) {
                return res.status(400).json({ message: "OTP code not correct." });
            }
            user.status = "Active"
            user.otpCode = 0;
            await user.save();

            return res.status(200).send({ message: "Register successfully." });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to do somthing exceptional." });
        }
    }

    static async setInfo(req, res, next) {
        try {
            const { name, email, country, address } = req.body;
            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(400).json({ message: "User not found." });
            }

            user.name = name;
            user.country = country;
            user.address = address
            user.roleId = 2;
            user.save();

            return res.status(200).send({ message: "Update info success." });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to do somthing exceptional." });
        }
    }
}

exports.AuthController = AuthController;
