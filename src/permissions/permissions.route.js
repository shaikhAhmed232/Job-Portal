const router = require('express').Router();
const {getPermissionByIdController, getPermissionsController, addPermissionController, updatePermissionByIdController, deletePermissionByIdController, restorePermissionByIdController} = require("./permissions.controller");
const {chekPerm} = require("../../middlewares/checkPermission");
const authenticate = require("../../middlewares/auth");

router.use(authenticate, chekPerm);
router.route('/').get(getPermissionsController).post(addPermissionController);
router.route('/:id').get(getPermissionByIdController).put(updatePermissionByIdController).delete(deletePermissionByIdController);
router.route('/restore/:id').get(restorePermissionByIdController);

module.exports = router;