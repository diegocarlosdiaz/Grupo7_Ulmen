module.exports = (sequelize, DataTypes) => {

    let alias = "Coleccion"
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


    }
    let config = {
        tableName: "coleccion",
        timestamps : false
    }
    const Coleccion = sequelize.define(alias, cols, config)

    Coleccion.associate = function (models) {
        Coleccion.hasMany(models.Producto, {
            foreignKey: "id_coleccion",
            as: "producto"
        })
    }
    return Coleccion

}