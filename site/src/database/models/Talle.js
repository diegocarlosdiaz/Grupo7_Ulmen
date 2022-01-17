module.exports = (sequelize, DataTypes) => {

    let alias = "Talle"
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
        tableName: "talle",
        timestamps : false
    }
    const Talle = sequelize.define(alias, cols, config)

    Talle.associate = function (models) {
        Talle.hasMany(models.Producto, {
            foreignKey: "id_talles",
            as: "producto"
        })
    }
    
    return Talle

}