const httpResponse = require('../utils/response');
const db = require('../models');
const {verifyToken} = require("../utils/jwt");
const {redisClient}=require("../config/redis")

module.exports = async (req, res, next) => {
    let token;
    try {
        token = req.headers.authorization;
        let response = {
            success: false,
            data: {
                message: "Unauthorized"
            },
            error: "Unauthorized"
        }
        if (!token || !token.startsWith("Bearer ")) {  
            httpResponse.unauthorized(res, response);
            return;
        };
        token = token.split(" ")[1];
        const foundUser=await redisClient.get(token)
        if(foundUser){
            req.user=JSON.parse(foundUser);
            next();
        }
        const dbToken = await db.token.findOne({
            where: {
                jwt: token,
            },
            raw: true
        });
        if (!dbToken) {
            httpResponse.unauthorized(res, respones);
            return;
        }
        const decoded = verifyToken(token);
        if (!decoded) {
            await db.token.destroy({
                where: {jwt: token}
            });
            httpResponse.unauthorized(res, response);
            return;
        };
        let user = await db.user.findOne({where: {id: decoded.id}});
        if (!user) {
            await db.token.destroy({
                where: {jwt: token}
            });
            httpResponse.unauthorized(res, response);
            return;
        }
        await redisClient.set(token,JSON.stringify(decoded))
        req.user = decoded;
        next();
    } catch (e) {
        // console.log(e);
        await db.token.destroy({
            where: {jwt: token}
        });
        httpResponse.unauthorized(res, {
            success: false,
            data: {
                message: "UnAuthorized" 
            },
            error: "UnAuthorized"
        })
    }
}