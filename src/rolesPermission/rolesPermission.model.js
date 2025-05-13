module.exports = (sequelize, DataTypes) => {
    const rolePermission = sequelize.define('rolePermission', {
        roleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        permId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    }, {
        paranoid: true,
        freezeTableName: true,
        tableName: "role_permission"
    });
    rolePermission.associate = (models) => {
        rolePermission.belongsTo(models.role, {foreignKey: "roleId"});
        rolePermission.belongsTo(models.permission, {foreignKey: "permId"});
    };
    return rolePermission;
}