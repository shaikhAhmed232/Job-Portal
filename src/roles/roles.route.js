const router = require("express").Router();
const {getRoles, getRoleById, createRole, updateRole, deleteRole, restoreRole} = require("./roles.controller");
const roleBodyValidator = require('../../utils/validators/role.validator');
const {validateBody} = require("../../middlewares/validator");

router.route('/').get(getRoles).post(roleBodyValidator(), validateBody(), createRole);
router.route('/:id').get(getRoleById).put(roleBodyValidator(), validateBody(), updateRole).delete(deleteRole);

router.get('/restore/:id', restoreRole);

module.exports = router;