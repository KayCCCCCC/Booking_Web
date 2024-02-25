const db = require('../model/index');
const bcrypt = require('bcryptjs')
const sendEmail = require('../utils/sendEmail');
const cloundinary = require('../utils/cloudinary');
const { where } = require('sequelize');

const User = db.user;
class UserController {
    static async GetAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Parse the page from the request query or default to page 1
            const perPage = 10; // Number of users to show per page
            const offset = (page - 1) * perPage; // Calculate the offset based on the page

            const userList = await User.findAndCountAll({
                attributes: ["id", "name", "email", "avatar", "status", "phone", "address"],
                where: { status: 'Active' },
                limit: perPage,
                offset: offset,
            });

            if (userList) {
                res.status(200).json({
                    message: "List of User",
                    data: userList
                })
            } else {
                res.status(400).json({
                    message: "List User is Null",
                })
            }
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to do somthing exceptional" });
        }
    }
    static async GetById(req, res) {
        try {
            const userId = req.params.id
            if (!userId) {
                res.status(400).json({
                    message: "UserId is required"
                })
            } else {
                const result = await User.findByPk(userId, {
                    attributes: ["id", "name", "email", "avatar", "status", "phone", "address"],
                })
                if (result) {
                    res.status(200).json({
                        message: `Data of User with Id ${userId}`,
                        data: result
                    })
                } else {
                    res.status(400).json({
                        message: `Data of User with Id ${userId} not found`,
                    })
                }
            }
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to do somthing exceptional" });
        }
    }
    static async CreateUser(req, res) {
        try {
            const { email, password, name, address, phone, country } = req.body;

            let user = await User.findOne({ where: { email } });

            if (user) {
                return res.status(400).json({ message: "Account already exists" });
            }

            const avatar = req.file.path;
            const result = await cloundinary.uploader.upload(avatar, {
                upload_preset: 'vnldjdbe',
                public_id: `unique_id_${Date.now()}`
            });

            const OTP = Math.floor(100000 + Math.random() * 900000);

            await sendEmail(email, OTP);

            const hashedPassword = await bcrypt.hash(password, 10);

            user = await User.create({
                email,
                otpCode: OTP,
                name,
                phone,
                avatar: result.secure_url || "",
                password: hashedPassword,
                roleId: 2,
                typeRegister: "normal-register",
                address: address || '',
                country: country || ''
            });

            return res.status(200).send({ message: "Success. Created new Account" });
        } catch (error) {
            return res.status(500).json({ message: "Failed to create account", error });
        }
    }

    static async UpdateUser(req, res) {
        try {
            const userId = req.params.id;
            const { name, address, phone, country, roleId } = req.body;

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const avatar = req.file.path;
            const result = await cloundinary.uploader.upload(avatar, {
                upload_preset: 'vnldjdbe',
                public_id: `unique_id_${Date.now()}`
            });

            if (name) user.name = name;
            if (address) user.address = address;
            if (phone) user.phone = phone;
            if (country) user.country = country;
            if (avatar) user.avatar = result.secure_url;
            if (roleId) user.roleId = roleId;

            await user.save();

            return res.status(200).json({ message: "User updated successfully", user });
        } catch (error) {
            return res.status(500).json({ message: "Failed to update user", error });
        }
    }

    static async DeleteUser(req, res) {
        try {
            const userId = req.params.id;

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.status = "InActive"

            await user.save();

            return res.status(200).json({ message: "User delete successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Failed to delete user", error });
        }
    }
}
exports.UserController = UserController