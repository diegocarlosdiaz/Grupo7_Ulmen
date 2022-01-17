module.exports = (sequelize, DataTypes) => {

    let alias = "Rol"
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
        tableName: "rol",
        timestamps : false
    }
    const Rol = sequelize.define(alias, cols, config)

    Rol.associate = function (models) {
        Rol.hasMany(models.Usuarios, {
            foreignKey: "id_rol",
            as: "usuario"
        })
    }


    return Rol

}