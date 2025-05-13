const {validationResult} = require('express-validator');
const httpResponse = require("../utils/response");

exports.validateBody = () => {
    return async (req, res, next) => {
        // for (let validator of validators) {
        //     console.log(validator);
        //     const error = await validator.run(req);
        //     if (error) break;
        // };
        const result = validationResult(req);
        // console.log(result.isEmpty());
        if (!result.isEmpty()) {
            httpResponse.badRequest(res, {success: false, data: result.array(), error: "ValidationError"});
            return;
        }
        next();
        return;
    }
}