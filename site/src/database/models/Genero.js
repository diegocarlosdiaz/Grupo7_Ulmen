module.exports = (sequelize, DataTypes) => {

    let alias = "Genero"
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
        tableName: "genero",
        timestamps : false
    }
    const Genero = sequelize.define(alias, cols, config)

        Genero.associate = function (models) {
            Genero.hasMany(models.Producto, {
                foreignKey: "id_sexo",
                as: "productos"
            })

            Genero.hasMany(models.Usuarios, {
                foreignKey: "id_genero",
                as: "usuarios"
            })
        }
    


    return Genero

}