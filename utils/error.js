const httpResponse = require('./response');

exports.tryCatchWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                const error = e.errors[0];
                const response = {
                    success: false,
                    data: {
                        "type": "field",
                        "msg": `${error.value} already exists`,
                        "path": error.path,
                        "location": "body"
                    },
                    error: "UniqueConstraintError"
                };
                httpResponse.badRequest(res, response);
                return;
            }
            console.log(e);
            e.message = "Something went wrong";
            next(e);
        }
    }
};
