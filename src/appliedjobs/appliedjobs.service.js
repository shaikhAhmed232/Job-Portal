const { paginate } = require("../../helper/paginate");
const db = require("../../models");
const {getJobService} = require("../jobs/jobs.service");
const {recruiterAppliedNotification, candidateAppliedNotification} = require("../../utils/mailTemplates")

exports.applyJobService = async (body, candidate) => {
    try {
        let response = await getJobService(body.jobId);
        if (!response.success) {
            return response;
        };
        body.candidateId = candidate.id;
        const appliedJob = await db.appliedJobs.create(body);
        const recMailTemplate=recruiterAppliedNotification({firstName:response.user.username});
      const canMailTemplate=candidateAppliedNotification({firstName:candidate.username});

      console.log(recMailTemplate, canMailTemplate);
        response = {
            success: true,
            data: appliedJob,
            error: null
        }
        return response;
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
            const response = {
                success: false,
                data: {
                    message: "You already applied to this job"
                },
                error: "UniqueConstraintError"
            };
            return response;
        }
        throw e;
    }
};

exports.getAppliedJobsService = async (user, limit, pageNo) => {
    let response;
    let roleId = user.roleId;
    const paginateResult = paginate(limit, pageNo)
    if (roleId === 1) {
        response = await this.getAppliedJobsAdmin(paginateResult.limit, paginateResult.offset);
    } else if (roleId === 1) {
        response = await this.getAppliedJobsRecruiter(user, paginateResult.limit, paginateResult.offset);
    } else {
        response = await this.getAppliedJobsCandidate(user, paginateResult.limit, paginateResult.offset);
    };
    return response;
}

exports.getAppliedJobsAdmin = async (limit, offset) => {
    const jobs = await db.appliedJobs.findAll({
        attributes: [],
        include: [
            {
                model: db.jobs,
                as: "job",
                include: {
                    model: db.user,
                    as: "recruiter"
                }
            },
            {
                model: db.user,
                as: "candidate"
            }
        ],
        limit,
        offset,
    });
    return {
        success: true,
        data: {jobs, count: jobs.length},
        error: null
    }
};

exports.getAppliedJobsRecruiter = async (recruiter, limit, offset) => {
    const jobs = await db.appliedJobs.findAll({
        include: [
            {
                model: db.jobs,
                where: {
                    createdBy: recruiter.id
                },
                as: 'job',
            },
            {
                model: db.user,
                as: "candidate"
            }
        ],
        limit,
        offset,
    });
    return {
        success: true,
        data: {jobs, count: jobs.length},
        error: null
    }
};

exports.getAppliedJobsCandidate = async (candidate, limit, offset) => {
    const jobs = await db.appliedJobs.findAll({
        where: {
            candidateId: candidate.id,
        },
        include: [
            {
                model: db.jobs,
                include: {
                    model: db.user,
                    as: "recruiter",
                },
                as: 'job',
            },
            {
                model: db.user,
                as: "candidate"
            }
        ],
        limit,
        offset,
    });
    return {
        success: true,
        data: {jobs, count: jobs.length},
        error: null
    }
};

exports.deleteAppliedJobsService = async (candidateId) => {
    const job = await db.appliedJobs.destroy({
        where: {
            candidateId
        }
    });
    if (job === 0) {
        return {
            success: false,
            data: {
                message: "There is not applied job with candidate id" + candidateId, 
            },
            error: null,
        }
    }   
    return {
        success: true,
        data: job,
        error: null
    }
}
