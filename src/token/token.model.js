module.exports = (sequelize, DataTypes) => {
    const token = sequelize.define('token', {
        userId: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        jwt: {
            type: DataTypes.TEXT
        }
    });
    // token.sync({alter: true})
    return token;
}