const db=require("../../models")

exports.createPermission=async(body)=>{
    let {action,method,baseUrl,url}=body
    const result=await db.permission.create({action,method,baseUrl,url})
    if(result){
        return {success: true, error:null,data:result}
    }else{
        return {error:"DataInsertError", success: false,data:result}
    }
}

exports.getPermissionById=async(id)=>{
    const result=await db.permission.findOne({where:{id}})
    if(result){
        return {error:null,success: true,data:result}
    }else{
        return {error:"NotFoundError", success: false, data:result}
    }
}

exports.fetchPermissions=async()=>{
    const result=await db.permission.findAll()
    if(result){
        return {error:null,success: true,data:result}
    }else{
        return {error:"NotFoundError", success: false ,data:result}
    }
}

exports.deletePermission=async(id)=>{
    const result=await db.permission.destroy({where:{id}})
    if(result){
        return {error:null,success: true,data:result}
    }else{
        return {error:"DataDeleteError",success: false,data:result}
    }
}

exports.updatePermission=async(id,body)=>{
    const {action,method,baseUrl,url}=body
    const findPermission=await db.permission.findOne({where:{id}})
    if(!findPermission){
        return {error:"NotFoudnError",success: false,data:findPermission}
    }
    const result=await db.permission.update({action,method,baseUrl,url},{where:{id}})
    if(result){
        return {error:null, success: true, data:result}
    }else{
        return {error:"DataUpdateError",success: false,data:result}
    }
}

exports.restorePermission=async(id)=>{
    const result=await db.permission.restore({where:{id}})
    if(result){
        return {error:null, success: true, data:result}
    }else{
        return {error:"DataNotFound",success: false,data:result}
    }
}