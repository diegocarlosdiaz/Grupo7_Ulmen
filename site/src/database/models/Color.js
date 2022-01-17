module.exports = (sequelize, DataTypes) => {

    let alias = "Color"
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
        tableName: "color",
        timestamps : false
    }
    const Color = sequelize.define(alias, cols, config)

    Color.associate = function (models) {
        Color.hasMany(models.Producto, {
            foreignKey: "id_colores",
            as: "producto"
        })
    }
    return Color

}