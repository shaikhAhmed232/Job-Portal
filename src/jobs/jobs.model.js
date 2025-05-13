const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const jobs = sequelize.define('jobs', {
        title: {
            type: DataTypes.STRING,
            field: 'title',
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            field: 'description',
            allowNull: false,
        }
    }, {
        paranoid: true,
        freezeTableName: true,
        tableName: "jobs"
    });
    jobs.associate = (models) => {
        jobs.belongsTo(models.user, {foreignKey: "createdBy", as: "recruiter"});
        jobs.hasMany(models.appliedJobs, {foreignKey: "jobId"});
    }
    return jobs
}