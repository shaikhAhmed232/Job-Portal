const response = require("../../utils/response");
const {tryCatchWrapper} = require("../../utils/error");
const { createPermission,getPermissionById,fetchPermissions,deletePermission,updatePermission,restorePermission } = require("./permissions.service")

exports.addPermissionController=tryCatchWrapper(async(req,res)=>{
    const {action,method,baseUrl,url} = req.body
    const permissionData={action,method,baseUrl,url}
    const result=await createPermission(permissionData)
    if(!result.error){
        return response.ok(res,result)
    }else{
        return response.unprocessableEntity(res,result)
    }
}
)

exports.getPermissionByIdController=tryCatchWrapper(async(req,res)=>{
    const {id}=req.params
    const result=await getPermissionById(id)
    if(!result.error){
        return response.ok(res,result)
    }else{
        return response.noData(res,result)
    }
})

exports.getPermissionsController=tryCatchWrapper(async(req,res)=>{
    const result=await fetchPermissions()
    if(!result.error){
        return response.ok(res,result)
    }else{
        return response.noData(res,result)
    }
})

exports.deletePermissionByIdController=tryCatchWrapper(async(req,res)=>{
    const {id}=req.params
    const result=await deletePermission(id)
    if(!result.error){
        return response.ok(res,result)
    }else{
        return response.noData(res,result)
    }
}
)
exports.updatePermissionByIdController=tryCatchWrapper(async(req,res)=>{
    const {id}=req.params
    const {action,method,baseUrl,url}=req.body
    const permissionData={action,method,baseUrl,url}
    const result=await updatePermission(id,permissionData)
    if(!result.error){
        return response.created(res,result)
    }else{
        return response.unprocessableEntity(res,result)
    }
})

exports.restorePermissionByIdController=tryCatchWrapper(async(req,res)=>{
    const {id}=req.params
    const result=await restorePermission(id)
    if(!result.error){
        return response.created(res,result)
    }else{
        return response.noData(res,result)
    }
})