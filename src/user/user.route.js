const router = require('express').Router();
const {getUsers, signup, login, logout, getSelf} = require("./user.controller");
const {validateBody} = require("../../middlewares/validator");
// const {body} = require('express-validator')
const {chekPerm} = require("../../middlewares/checkPermission")
const authenticate = require("../../middlewares/auth")
const {userValidation, loginValidator} = require("../../utils/validators/user.validator");

router.get('/', authenticate, chekPerm, getUsers);
router.get('/current', authenticate, getSelf);
router.post('/', userValidation(), validateBody(), signup);
router.post('/login', loginValidator(), validateBody(), login);
router.delete('/logout', authenticate, logout);

module.exports = router;