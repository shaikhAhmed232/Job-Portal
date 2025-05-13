module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define("role", {
        roleName: {
            type: DataTypes.STRING,
            field: "role_name",
            unique: true,
            allowNull: false,
            set(value) {
                let newValue = value.toLowerCase();
                this.setDataValue('roleName', newValue)
            }
        },
        description: {
            type: DataTypes.STRING,
            field: "description",
            allowNull: false,
        }
    }, {
        paranoid: true,
        freezeTableName: true,
        tableName: "roles"
    });
    // role.sync({alter: true});
    role.associate = (models) => {
        role.hasMany(models.user, {foreignKey: "roleId"});
        role.hasMany(models.rolePermission, {foreignKey: "roleId"})
    };
    // role.sync({force: true});
    return role;
};