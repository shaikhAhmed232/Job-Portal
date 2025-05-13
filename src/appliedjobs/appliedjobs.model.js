module.exports = (sequelize, DataTypes) => {
    const appliedJobs = sequelize.define('appliedJobs', {
        candidateId: {
            type: DataTypes.INTEGER,
            field: "candidate_id",
            primaryKey: true,
        },
        jobId: {
            type: DataTypes.INTEGER,
            field: "job_id",
            primaryKey: true,
        }
    }, {
        paranoid: true,
        freezeTableName: true,
        tableName: 'applied_jobs'
    });
    appliedJobs.associate = (models) => {
        appliedJobs.belongsTo(models.user, {foreignKey: "candidateId", as: "candidate"});
        appliedJobs.belongsTo(models.jobs, {foreignKey: "jobId", as: "job"});
    }
    return appliedJobs;
}