const db = require("../model/index");
const sendEmail = require("../utils/sendEmail");
const { Token } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const cloundinary = require('../utils/cloudinary');
const jwt = require("jsonwebtoken");

const User = db.user;
const Role = db.role;
const Order = db.order;
const Package = db.servicePackage;

class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.toLowerCase())) {
                return res.status(400).json({
                    message: `Invalid email format ${email.toLowerCase()}`
                });
            }
            const user = await User.findOne({
                where: { email: email }
            });

            if (!user || !user.name)
                return res
                    .status(500).send({
                        success: false,
                        message: "This account does not exist."
                    });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    success: false,
                    message: "Password incorrect."
                });
            }

            if (user.status === "InActive") {
                return res.status(500).send({
                    success: false,
                    message: "Account has been banned"
                });
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
                success: true,
                message: "Login Success",
                access_token: access_token,
                data: {
                    user: {
                        name: user.name,
                        email: user.email,
                        address: user.address,
                        country: user.country,
                        avatar: user.avatar,
                        phone: user.phone
                    }
                }
            });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to do somthing exceptional" });
        }
    }

    static async LoginWithGoogle(req, res) {
        const { email, avatar, name } = req.body
        const userExist = await User.findOne({
            where: { email: email }
        })
        if (userExist == null) {
            const createUser = await User.create({
                email,
                name,
                avatar,
                roleId: 2,
                typeRegister: "google",
                policyAccepted: true
            });
            const access_token = await Token.generateAccessToken({ id: createUser.id, role: createUser.roleId });
            const refresh_token = await Token.generateRefreshToken({ id: createUser.id, role: createUser.roleId });
            await res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
                sameSite: "none",
                secure: true,
            });
            return res.status(200).send({
                success: true,
                message: "Login Success",
                access_token: access_token,
                data: {
                    user: {
                        name: createUser.name,
                        email: createUser.email,
                        address: createUser.address,
                        country: createUser.country,
                        avatar: createUser.avatar,
                        phone: createUser.phone
                    }
                }
            });
        } else {
            const access_token = await Token.generateAccessToken({ id: userExist.id, role: userExist.roleId });
            return res.status(200).send({
                success: true,
                message: "Login Success",
                access_token: access_token,
                data: {
                    user: {
                        name: userExist.name,
                        email: userExist.email,
                        address: userExist.address,
                        country: userExist.country,
                        avatar: userExist.avatar,
                        phone: userExist.phone
                    }
                }
            });
        }
    }

    static async refresh_token(req, res, next) {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) {
                return res.status(400).json({
                    success: false,
                    message: "Please login now"
                });
            }

            const decode = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
            if (!decode) return res.status(400).json({
                success: false,
                message: "Please login now"
            });
            if (decode.id) {
                const user = await User.findByPk(decode.id, {
                    attributes: ["id", "name", "email"]
                });

                const access_token = await Token.generateAccessToken({ id: user.id });
                return res.status(200).json(
                    {
                        success: false,
                        access_token,
                        user
                    });
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
            return res.status(200).send({
                success: false,
                message: "Logged out"
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Logout error"
            });
        }
    }

    static async firstStepRegisteration(req, res) {
        try {
            const { email, password, confirmPassword, policyAccepted } = req.body;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.toLowerCase())) {
                return res.status(400).json({
                    message: `Invalid email format ${email.toLowerCase()}`
                });
            }

            const user = await User.findOne({ where: { email: email.toLowerCase() } });

            if (user && !parseInt(user.otpCode)) {
                return res.status(400).json({
                    success: false,
                    message: "Account already exists"
                });
            }
            if (password !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Password and ConfirmPassword do not match"
                });
            }

            if (!policyAccepted) {
                return res.status(400).json({
                    success: false,
                    message: "Policy is not Accepted",
                });
            }

            if (user == null) {
                const OTP = Math.floor(100000 + Math.random() * 900000);
                const hashedPassword = await bcrypt.hash(password, 10);
                const now = new Date();
                now.setMinutes(now.getMinutes() + 2);

                await User.create({
                    email: email.toLowerCase(),
                    otpCode: OTP,
                    password: hashedPassword,
                    roleId: 2,
                    status: "InActive",
                    typeRegister: "normal-register",
                    policyAccepted: policyAccepted,
                    createdAt: now
                });

                await sendEmail(email, OTP);

            } else {
                const now = new Date();

                if (user.createdAt.getTime() < now) {
                    const OTP = Math.floor(100000 + Math.random() * 900000);
                    const now = new Date();
                    now.setMinutes(now.getMinutes() + 2);

                    await User.update({
                        otpCode: OTP,
                        createdAt: now
                    }, { where: { email: email.toLowerCase() } });

                    await sendEmail(email, OTP);
                } else {
                    return res.status(400).json({
                        message: "OTP code is not expired."
                    });
                }
            }

            const userAfter = await User.findOne({ where: { email: email.toLowerCase() } });

            return res.status(200).json({
                success: true,
                message: "Success. Check your email to get the OTP code",
                data: {
                    user: {
                        email: userAfter.email
                    }
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to process the request"
            });
        }
    }


    static async submitOTP(req, res) {
        try {
            const { email, OTPCode } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User not found."
                });
            }

            if (OTPCode != user.otpCode) {
                return res.status(400).json({
                    success: false,
                    message: "OTP code not correct."
                });
            }
            const now = new Date();
            now.setHours(now.getHours() + 7);

            const userCreatedAt = new Date(user.createdAt);

            const twoMinutesAgo = new Date(userCreatedAt.getTime() - (2 * 60 * 1000));

            userCreatedAt.setHours(userCreatedAt.getHours() + 7);

            if (now > twoMinutesAgo && now < userCreatedAt) {
                user.status = "Active"
                user.otpCode = 0;
                await user.save();
            } else {
                return res.status(400).send({
                    success: false,
                    message: "OTP code is expired.",
                });
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
                success: true,
                message: "Register successfully.",
                access_token: access_token
            });
        } catch (error) {
            return res
                .status(500)
                .json({
                    success: false,
                    message: "Failed to do somthing exceptional."
                });
        }
    }

    static async setInfo(req, res, next) {
        try {
            const { name, email, country, address, phone } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User not found."
                });
            }

            const avatar = req.file ? req.file.path : null;
            if (avatar) {
                const result = await cloundinary.uploader.upload(avatar, {
                    upload_preset: 'vnldjdbe',
                    public_id: `unique_id_${Date.now()}`
                });
                user.avatar = result.secure_url || "";
            }

            user.name = name || user.name;
            user.country = country || user.country;
            user.address = address || user.address;
            user.phone = phone || user.phone;
            user.roleId = 2;

            await user.save();

            return res.status(200).json({
                success: true,
                message: "Update info success.",
                data: {
                    user: {
                        name: user.name,
                        email: user.email,
                        address: user.address,
                        country: user.country,
                        avatar: user.avatar,
                        phone: user.phone
                    }
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to do something exceptional."
            });
        }
    }

    static async ReSendOTP(req, res) {
        try {
            const { email } = req.body
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.toLowerCase())) {
                return res.status(400).json({
                    message: `Invalid email format ${email.toLowerCase()}`
                });
            }

            const user = await User.findOne({ where: { email: email.toLowerCase() } });

            if (user == null) {
                return res.status(400).json({
                    success: false,
                    message: "User not found."
                });
            }

            if (user.OTPCode != "0" && user.status == "InActive") {
                const now = new Date();

                if (user.createdAt.getTime() < now) {
                    const OTP = Math.floor(100000 + Math.random() * 900000);
                    const now = new Date();
                    now.setMinutes(now.getMinutes() + 2);

                    await User.update({
                        otpCode: OTP,
                        createdAt: now
                    }, { where: { email: email.toLowerCase() } });

                    await sendEmail(email, OTP);

                    const userAfter = await User.findOne({ where: { email: email.toLowerCase() } });

                    return res.status(200).json({
                        success: true,
                        message: "Success. Check your email to get the OTP code",
                        data: {
                            user: {
                                email: userAfter.email
                            }
                        }
                    });
                } else {
                    return res.status(400).json({
                        message: "OTP code is not expired."
                    });
                }
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Failed to do something exceptional."
            });
        }
    }

}

exports.AuthController = AuthController;
