const db = require('../../models');

exports.pushTokenInDb = async (userId, incomingToken) => {
    const user = await db.token.findOne({where: {userId}});
    if (user) {
        user.jwt = incomingToken;
        return {
            success: true,
            data: user,
            error: null
        }
    };
    const token = await db.token.create({userId, jwt: incomingToken});
    return {
        success: true,
        data: token,
        error: null
    }
};

exports.getToken = async (userId, incomingToken) => {
    const token = await db.token.findOne({where: {userId, jwt: incomingToken}});
    if (!token) {
        return {
            success: false,
            data: null,
            error: 'NotFoundError',
        }
    };
    return {
        success: true,
        data: token,
        error: null
    }
};

exports.deleteToken = async (userId) => {
    const token = await db.token.findOne({where: {userId}});
    if (!token) {
        return {
            success: false,
            data: null,
            error: "NotFoundError"
        };
    };
    await token.destroy();
    return {
        success: true,
        data: null,
        error: null
    }
}