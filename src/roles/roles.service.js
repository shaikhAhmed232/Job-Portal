const db = require("../../models");

exports.getRolesService = async () => {
    const roles = await db.role.findAll();
    return {
        success: true,
        data: roles,
        error: null
    }
};

exports.getRoleByIdService = async (id) => {
    let response = {
        success: false,
        data: null,
        error: null,
    }
    const role = await db.role.findOne({where: {id}});
    if (!role) {
        response.error = "NotFoundError"
        response.data = {message: `Role with id ${id} does not found`};
    } else {
        response.data = role;
        response.success = true
    };
    return response;
};

exports.createRoleService = async (data) => {
    let response = {
        success: false,
        data: null,
        error: null
    };
    const role = await db.role.create(data);
    response.success = true;
    response.data = role;
    return response;
};

exports.updateRoleService = async (id, data) => {
    const [updated, role] = await db.role.update({...data}, {where: {id}, returning: true});
    if (Number(updated) === 0) {
        return {
            success: false, data: {
                message: "Data not found"
            },
            error: "NotFoundError"
        }
    } 
    return {success: true, data: role, error: null};
};

exports.deleteRoleService = async (id) => {
    const [role] = await db.role.destroy({where: {id}, returning: true});
    if (!role) {
        return {
            success: true,
            data: {
                message: `Data with id ${id} not found`
            },
            error: "NotFoundError"
        }
    };
    return {
        success: true,
        data: role,
        error: null,
    }
};

exports.restoreRoleService = async (id) => {
    const [role] = await db.role.restore({where: {id}, returning: true});
    if (!role) {
        return {success: false, data: {message: `Role not found`}, error: "NotFoundError"}
    }
    return {success: true, data: role, error: null};
}