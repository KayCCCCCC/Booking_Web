const db = require("../model/index");
const Role = db.role;

class RoleController {
    static async autoCreateRoles(req, res) {
        try {
            const roles = ["Admin", "Customer", "Guest"];

            for (const item of roles) {
                await Role.create({
                    name: item,
                    description: item
                });
            }

            return res.status(200).json({
                success: true,
                message: "Success"
            });
        } catch (error) {
            console.error("Error creating roles:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong!"
            });
        }
    }
}
exports.RoleController = RoleController;
