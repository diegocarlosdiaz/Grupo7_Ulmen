const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const controllers = {
    home: (req, res) => { 

        db.Producto.findAll({
            include : [{all : true}]
        })
            .then(productos => {
                    return res.render('index', { 
                    productos 
                }) 
            })
            .catch(error => console.log(error))

       
    },
    nosotros: (req, res) => {
        return res.render('nosotros') 
    },
    search: (req, res) => {
        db.Producto.findAll({
            include: ['Categoria'],
            include: { association: 'imagenes' },
            where: {
                [Op.or]: [
                    {
                        nombre: {
                            [Op.substring]: req.query.search
                        }
                    },
                    {
                        descripcion: {
                            [Op.substring]: req.query.search
                        }
                    }
                ]
            }
        })
            .then(productos => {
                return res.render('searchResults', {
                    title: "Resultado de la búsqueda",
                    productos,
                    busqueda: req.query.busqueda
                })
            })
            .catch(error => console.log(error))

    }
}

module.exports = controllers