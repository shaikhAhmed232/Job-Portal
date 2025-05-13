const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            field: "username",
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            field: "email",
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            field: "password",
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            field: "role_id"
        }
    }, {
        paranoid: true,
        freezeTableName: true,
        tableName: 'users'
    });
    // user.sync({alter: true})
    user.hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    };

    user.isValidPassword = async (hashedPassword, passwordToCheck) => {
        const validPassword = await bcrypt.compare(passwordToCheck, hashedPassword);
        return validPassword;   
    };

    user.associate = (models) => {
        user.hasMany(models.jobs, {foreignKey: "createdBy"});
        user.hasMany(models.appliedJobs, {foreignKey: "candidateId"});
        user.belongsTo(models.role, {foreignKey: "roleId"});
    };
    // user.sync({alter: true});
    return  user;
}