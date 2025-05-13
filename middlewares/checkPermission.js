const db = require('../models');
const httpResponse = require('../utils/response');

exports.chekPerm = async (req, res, next) => {
    try {
        const roleId = req.user.roleId;
        const permissionCondition = {
            method: req.method.toLowerCase(),
            baseUrl: req.baseUrl,
            url: req.route.path,
        }
        const permission = await db.role.findOne({
            where: {id: roleId},
            include: [{
                model: db.rolePermission,
                include: {
                    model: db.permission,
                    where: permissionCondition,
                },
                required: true,
            }],
            raw: true,
            nest: true,
        });
        if (!permission) {
            const response = {
                success: false,
                data: {
                    message: "You don't have access"
                },
                error: "ForbiddenError"
            };
            httpResponse.forbidden(res, response);
            return;
        };
        next();
    } catch (e) {
        console.log(e);
        res.status(403).json({error: "Forbidden", data: {message: "Dont have access"}, success: false});
    }
}