module.exports = (sequelize, DataTypes) => {

    let alias = "Producto";
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
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_colores: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_talles: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_sexo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_coleccion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }


    };
    let config =
    {
        tableName: "producto",
        timestamps: false

    }

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function (models) {
        Producto.belongsTo(models.Color, {
            foreignKey: "id_colores",
            as: "color"
        })
        Producto.belongsTo(models.Talle, {
            foreignKey: "id_talles",
            as: "talles"
        })
        Producto.belongsTo(models.Sexo, {
            foreignKey: "id_sexo",
            as: "sexo"
        })
        Producto.belongsTo(models.Coleccion, {
            foreignKey: "id_coleccion",
            as: "coleccion"
        })
        Producto.belongsTo(models.Categoria, {
            foreignKey: "id_categoria",
            as: "Categoria"
        })
        Producto.hasMany(models.Imagen, {
            foreignKey: "productos_id",
            as: "imagenes"

        })
    }


    return Producto
}