module.exports = (sequelize, DataTypes) => {
    const permission = sequelize.define("permission", {
        action: {
            type: DataTypes.STRING,
            field: "action",
            allowNull: false,
        },
        method: {
            type: DataTypes.STRING,
            field: "method",
            allowNull: false,
            deafult: "get",
            set (value) {
                let rawValue = value.toLowerCase();
                this.setDataValue("method", rawValue);
            },
        },
        baseUrl: {
            type: DataTypes.STRING,
            field: "base_url",
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            field: "url",
            allowNull: false
        }
    }, {
        paranoid: true,
        freezeTableName: true,
        tableName: "permissions"
    });
    // permission.sync({alter: true})
    permission.associate = (models) => {
        permission.hasMany(models.rolePermission, {foreignKey: "permId"});
    }
    return permission;
};