const {tryCatchWrapper} = require('../../utils/error');
const {getUsers, createUser, loginUser, logoutService, resetPasswordService, forgotPassword} = require('./user.service');
const httpResponse = require("../../utils/response");

exports.getUsers = tryCatchWrapper(async (req, res, next) => {
        const response = await getUsers();
        return res.status(200).json(response);
})

exports.signup = tryCatchWrapper(async (req, res, next) => {
    const response = await createUser(req.body);
    if (!response.success) {
        httpResponse.badRequest(res, response);
        return;
    }
    httpResponse.created(res, response);
    return;
});

exports.login = tryCatchWrapper(async (req, res, next) => {
    const response = await loginUser(req.body);
    if (!response.success) {
        return httpResponse.badRequest(res, response);
    };
    return httpResponse.ok(res, response);
});

exports.logout = tryCatchWrapper(async (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    const response = await logoutService(token, req.user);
    if (response.success) {
        httpResponse.ok(res, response);
        return;
    };
    httpResponse.unprocessableEntity(res, response);
    return;
});

exports.getSelf = tryCatchWrapper(async (req, res, next) => {
    const user = req.user;
    const response = {
        success: true,
        error: null,
        data: user
    };
    httpResponse.ok(res, response);
    return;
});

exports.forgotPasswordController=async(req,res)=>{
    const {email}=req.body
    const result=await forgotPassword(email)
    if(!result.error){
        return response.ok(res,result)
    }else{
        return response.noData(res,result)
    }
};

exports.resetPasswordController=async(req,res)=>{
    const {email,password,otp}=req.body
    const userData={email,password,otp}
    const result=await resetPasswordService(userData)
    if(!result.error){
        return response.ok(res,result)
    }else{
        return response.noData(res,result)
    }

}
