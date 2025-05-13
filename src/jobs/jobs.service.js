const {jobs, user} = require('../../models');

exports.getJobsService = async () => {
    const dbJobs = await jobs.findAll({
        include:{
            model: user,
            as: 'recruiter',
            attributes: {exclude: ["password"]}
        },
        raw: true,
        nest: true,
    });

    return {
        success: true,
        data: dbJobs,
        error: null
    }
};

exports.getJobService = async (id) => {
    const dbJob = await jobs.findOne({
        where: {id},
        include: {
            model: user,
            as: "recruiter",
            attributes: {exclude: ["password"]}
        },
        raw: true,
        nest: true
    });
    if (!dbJob) {
        return {
            success: false,
            data: {
                message: `Job with id ${id} not found`
            },
            error: "DataNotFound"
        }
    };
    return {
        success: true,
        data: dbJob,
        error: null,
    }
};

exports.createJobService = async (data, recruiter) => {
    const dbJobs = jobs.build(data);
    dbJobs.createdBy = recruiter.id;
    await dbJobs.save();
    return {
        success: true,
        data: dbJobs,
        error: null
    };
};

exports.updateJobService = async (id, user, data) => {
    const dbJob = await jobs.findOne({where: {id}});
    if (!dbJob) {
        const response = {
            success: false,
            data: {
                message: `Job with id ${id} not found`
            },
            error: "NotFoundError"
        };
        return response;
    };
    if (dbJob.createdBy !== user.id) {
        const response = {
            success: false,
            data: {
                message: `Forbidden`
            },
            error: "ForbiddenError"
        };
        return response;
    }
    dbJob.title = data.title;
    dbJob.description = data.description;
    await dbJob.save();
    return {
        success: true,
        data: dbJob,
        error: null
    }
};


exports.deleteJobService = async (id, user, data) => {
    const dbJob = await jobs.findOne({where: {id}});
    if (!dbJob) {
        const response = {
            success: false,
            data: {
                message: `Job with id ${id} not found`
            },
            error: "NotFoundError"
        };
        return response;
    };
    if (dbJob.createdBy !== user.id) {
        const response = {
            success: false,
            data: {
                message: `Forbidden`
            },
            error: "ForbiddenError"
        };
        return response;
    }
    await dbJob.destroy();
    return {
        success: true,
        data: dbJob,
        error: null
    }
};