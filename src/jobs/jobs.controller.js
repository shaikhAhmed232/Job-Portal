const { tryCatchWrapper } = require("../../utils/error");
const {getJobsService, getJobService, createJobService, updateJobService} = require("./jobs.service")
const httpResponse = require("../../utils/response");


exports.getJobs = tryCatchWrapper(async (req, res) => {
    const response = await getJobsService();
    httpResponse.ok(res, response);
    return;
});

exports.getJob = tryCatchWrapper(async (req, res, next) => {
    const {id} = req.params;
    const response = await getJobService(id);
    if (!response.success) {
        httpResponse.badRequest(res, response);
        return;
    };
    httpResponse.ok(res, response);
    return;
});

exports.createJob = tryCatchWrapper(async (req, res, next ) => {
    const {body} = req;
    const recruiter = req.user;
    const response = await createJobService(body, recruiter);
    httpResponse.created(res, response);
    return;
});

exports.updateJob = tryCatchWrapper(async(req, res, next) => {
    const {id} = req.params;
    const response = await updateJobService(id, req.user, req.body);
    if (!response.success) {
        if (response.error === "NotFoundError") {
            httpResponse.badRequest(res, response);
            return;
        };
        httpResponse.unauthorized(res, response);
        return;
    }
    httpResponse.ok(res, response);
    return;
});
