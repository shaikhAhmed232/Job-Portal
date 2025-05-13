const {tryCatchWrapper} = require('../../utils/error');
const { getRolesService, getRoleByIdService, createRoleService, updateRoleService, deleteRoleService, restoreRoleService } = require("./roles.service");
const httpResponse = require("../../utils/response");

exports.getRoles = tryCatchWrapper(async (req, res, next) => {
    const response = await getRolesService();
    httpResponse.ok(res, response);
    return;
});

exports.getRoleById = tryCatchWrapper(async (req, res, next) => {
    console.log("REQUEST URL", req.url, req._parsedUrl, req.baseUrl);
    const {id} = req.params;
    const response = await getRoleByIdService(id);
    if (!response.success) {
        httpResponse.noData(res, response);
        return;
    };
    httpResponse.ok(res, response);
    return;
});

exports.createRole = tryCatchWrapper(async (req, res, next) => {
    const response = await createRoleService(req.body);
    if (response.success) {
        httpResponse.ok(res, response);
        return;
    }
    httpResponse.badRequest(res, response);
    return;
});

exports.updateRole = tryCatchWrapper(async (req, res, next) => {
    const {id} = req.params;
    const response = await updateRoleService(id, req.body);
    if (response.success) {
        httpResponse.ok(res, response);
        return;
    }
    httpResponse.badRequest(res, response);
    return;
});

exports.deleteRole = tryCatchWrapper(async (req, res) => {
    const {id} = req.params;
    const response = await deleteRoleService(id, req.body);
    if (response.success) {
        httpResponse.ok(res, response);
        return;
    }
    httpResponse.badRequest(res, response);
    return;
});

exports.restoreRole = tryCatchWrapper(async (req, res) => {
    const {id} = req.params;
    const response = await restoreRoleService(id);
    if (response.success) {
        httpResponse.ok(res, response);
        return;
    }
    httpResponse.badRequest(res, response);
    return;
})