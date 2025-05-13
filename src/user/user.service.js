const db = require("../../models");
const {user} = require("../../models");
const {generateToken, verifyToken} = require('../../utils/jwt');
const {pushTokenInDb, deleteToken} = require('../token/token.service')

exports.getUsers = async () => {
    const users = await user.findAll();
    return {
        success: true,
        data: users,
        error: null,
    }
};

exports.createUser = async (userDetail) => {
    let role = userDetail.role;
    if (!role) {
        role = 'candidate';
    }
    const dbRole = await db.role.findOne({
        where: {
            roleName: role
        },
        raw: true
    });
    if (!dbRole) {
        return {
            success: false, data: {
                message: "Invalid role"
            },
            error: 'BadRequestError'
        }
    };
    userDetail.roleId = dbRole.id;
    delete userDetail.role;
    const newUser = user.build(userDetail);
    const hashedPassword = await user.hashPassword(newUser.password);
    newUser.password = hashedPassword;
    await newUser.save();
    let data = Object.assign({}, newUser.dataValues);
    delete data.password;
    return {success: true, data, error: null};
};

exports.loginUser = async (credentials) => {
    const {email, password} = credentials; 
    if (!email || !password) {
        return {
            success: false,
            data: {message: "Credentials are required"},
            error: "InvalidCredentialsError"
        }
    };
    const dbUser = await user.findOne({where: {email}, raw: true});
    if (!dbUser) {
        return {
            success: false,
            data: {message: "invalid email or password"},
            error: "InvalidCredentialsError"
        }
    };
    const alreadyLoggedIn = await db.token.findOne({
        where: {
            userId: dbUser.id
        },
        raw: true
    });
    if (alreadyLoggedIn) {
        try {
            const decoded = verifyToken(alreadyLoggedIn.jwt);
            if (decoded) {
                console.log('USER ALREADY LOGGED IN');
                return {
                    success: true,
                    data: {
                        token: alreadyLoggedIn.jwt,
                        user:decoded,
                    },
                    error: null
                };
            }
        } catch (e) {
            await alreadyLoggedIn.destroy();
        }
    }
    const isValidPassword = await user.isValidPassword(dbUser.password, credentials.password);
    if (!isValidPassword) {
        return {
            success: false,
            data: {message: "invalid email or password"},
            error: "InvalidCredentialsError"
        }
    };
    let payload = {...dbUser};
    delete payload.password
    const token = generateToken(payload);
    await pushTokenInDb(payload.id, token);
    return {
        success: true,
        data: {
            token,
            user:payload,
        },
        error: null
    };
};

exports.logoutService = async (token = "", user) => {
    try { 
        await db.token.destroy({
            where: {
                jwt: token,
                userId: user.id
            }
        });
        return {
            success: true,
            data: {
                message: "Logged out"
            },
            error: null
        }
    } catch (e) {
        return {
            success: false,
            data: {
                message: "Failed to log out"
            },
            error: "InternalServerError"
        }
    }
};

exports.forgotPassword=async(email)=>{

    const result=await db.user.findOne({where:{email}})
    if(result){
        const random=Math.floor(Math.random()*8999)+1000
        const mailTemplate= forgetPasswordTemplate({firstName:result.firstName,otp:random})
        const expiryTime=moment().add(10,"minutes")
        const genOtp=await db.userOtp.create({otp:random,userId:result.id,expiryTime})
        if(genOtp){
            await sendEmail(result.email,null,mailTemplate.subject,mailTemplate.message)
            return {error:null,message:"Otp Sent Successfully"}
        }else{
            return {error:true,message:"Otp could not be sent"}
        }
    }else{
        return {error:true,message:"Email Address Not Found"}
    }
}

exports.resetPasswordService=async(body)=>{
    const {email,password,otp}=body
    const user=await db.user.findOne({where:{email}})
    if(!user){
        return {error:true,message:"User Not Found"}
    }
    const verifyOtp=await db.userOtp.findOne({where:{userId:user.id,otp,isVerified:true},order:[["createdAt","DESC"]]})
    if(!verifyOtp){
        return {error:true,message:"Otp Not Verified"}
    }else if(moment().isSameOrAfter(verifyOtp.expiryTime)){
        return {error:true,message:"Otp is Expired"}
    }
    await passwordSchema.validateAsync(password)
    const mailTemplate=updatePasswordTemplate({firstName:user.firstName})
    const result=await db.user.update({password},{where:{id:user.id}})
    if(result[0]){
        await sendEmail(user.email,null,mailTemplate.subject,mailTemplate.message)
        return {error:null,message:"Successfully updated password"}
    }else{
        return {error:true,message:"Could Not Update the password"}
    }
}