module.exports = (sequelize, type) => {
    return sequelize.define('testdetails', {
        id: {
            field: 'id',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        STT: {
            type : type.INTEGER,
            allowNull: false
        }
    }, { timestamps: false })
}