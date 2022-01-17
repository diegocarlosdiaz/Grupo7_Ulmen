module.exports = (sequelize, DataTypes) => {

    let alias = "Categoria"
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
        tableName: "categoria",
        timestamps : false
    }
    const Categoria = sequelize.define(alias, cols, config)

    Categoria.associate = function (models) {
        Categoria.hasMany(models.Producto, {
            foreignKey: "id_categoria",
            as: "producto"
        })
    }
  
    return Categoria

}
