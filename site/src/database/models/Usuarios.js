module.exports = (sequelize, DataTypes) => {

    let alias = "Usuarios"
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
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DNI: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_genero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_rol: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },


    }
    let config = {
        tableName: "usuarios",
        timestamps : false
    }
    const Usuarios = sequelize.define(alias, cols, config);

    Usuarios.associate = function (models) {
        Usuarios.belongsTo(models.Genero, {
            foreignKey: "id_genero",
            as: "genero"
        })
        Usuarios.belongsTo(models.Rol, {
            foreignKey: "id_rol",
            as: "rol"
        })
    }
    
   



    return Usuarios
}