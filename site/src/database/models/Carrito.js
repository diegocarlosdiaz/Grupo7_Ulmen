module.exports = (sequelize, DataTypes) => {

    let alias = "Carrito"
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
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_orden: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
        },

    }
    let config = {
        tableName: "carrito",
        timestamps : false
    }
    const Carrito = sequelize.define(alias, cols, config)

    Carrito.associate = function (models) {
        Carrito.belongsTo(models.Producto, {
            foreignKey: "id_producto",
            as: "producto"
        })
        Carrito.belongsTo(models.Orden, {
            foreignKey: "id_orden",
            as: "orden"
        })
    }
    return Carrito

}