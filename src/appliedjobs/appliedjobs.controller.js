const {tryCatchWrapper} = require('../../utils/error');
const httpResponse = require("../../utils/response");
const {applyJobService, getAppliedJobsService, deleteAppliedJobsService} = require("./appliedjobs.service")

exports.applyOnJob = tryCatchWrapper(async (req, res, next) => {
    const body = req.body;
    const {user} = req;
    const response = await applyJobService(body, user);
    if (!response.success) {
        httpResponse.badRequest(res, response);
        return;
    }
    httpResponse.created(res, response);
    return;
});

exports.getAppliedJobs = tryCatchWrapper(async (req, res, next ) => {
    const {limit, pageNo} = req.query;
    const response = await getAppliedJobsService(req.user, limit, pageNo);
    httpResponse.ok(res, response);
    return;
});

exports.deleteAppliedJobs = tryCatchWrapper(async (req, res, next) => {
    const response = await deleteAppliedJobsService(Number(req.params.id));
    return httpResponse.ok(res, response);
});
