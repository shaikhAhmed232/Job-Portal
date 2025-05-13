const {body} = require('express-validator');

exports.userValidation = () => {
    return ([
        body('username').notEmpty().withMessage("username is required").bail(),
        body('email').notEmpty().withMessage('email is required').bail().isEmail().withMessage("Email is not valid").bail(),
        body('password').notEmpty().withMessage('password is required').bail().isLength({min: 8}).withMessage("Password should be atleast 8 characters long").bail().matches(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).+$/g).withMessage("Password should contain\n1) At least one capital letter.\n2) At least one numeric.\n3) At least one special characters(!@#$%^&*) etc.").bail()
    ])
};

exports.loginValidator = () => {
    return ([
        body('email').notEmpty().withMessage("Required").bail(),
        body('password').notEmpty().withMessage("Required").bail()
    ])
}