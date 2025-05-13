const {body} = require('express-validator');

function roleBodyValidator () {
    return ([
        body('roleName').notEmpty().withMessage("role name is requried").bail().isString().withMessage("role name should be string").bail(),
        body("description").notEmpty().withMessage("Description for role is required").bail(),
    ])
};

module.exports = roleBodyValidator;