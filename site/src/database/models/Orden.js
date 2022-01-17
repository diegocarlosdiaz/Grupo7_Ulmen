module.exports = (sequelize, DataTypes) => {

    let alias = "Orden"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
    let config = {
        tableName: "ordenes",
        timestamps : false
    }
    const Orden = sequelize.define(alias, cols, config)

    Orden.associate = function (models) {
        Orden.hasMany(models.Carrito, {
            foreignKey: "id_orden",
            as: "carritos"
        })
        Orden.belongsTo(models.Usuarios, {
            foreignKey: "id_usuario",
            as: "usuario"
        })
    }
    return Orden

}