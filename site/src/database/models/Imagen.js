module.exports = (sequelize, DataTypes) => {

    let alias = "Imagen"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productos_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    }
    let config = {
        tableName: "imagen",
        timestamps : false
    }
    const Imagen = sequelize.define(alias, cols, config)

    Imagen.associate = function (models) {
        Imagen.belongsTo(models.Producto, {
            foreignKey: "productos_id",
            as: "producto"
        })
    }
  
    return Imagen

}
