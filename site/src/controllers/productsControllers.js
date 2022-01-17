const path = require('path')
const products = require('../data/products.json')


const db = require('../database/models');

const controllers = {
    productFilter: (req, res) => {

        db.Genero.findByPk(req.query.genero, {
            include: [
                {
                    association: 'productos',
                    include: [{ all: true }]
                }
            ]
        })

            .then((genero) => {
                return res.render('productFilter', {
                    nombre: genero.nombre,
                    productos: genero.productos
                })
            })
            .catch((error) => console.log(error))
    },
    productDetail:(req, res) => {
		
		let producto = db.Producto.findByPk(req.params.id, {
			include : [{all:true}],
            include: { association: 'imagenes' }
		})
        let talles = db.Talle.findAll()

        Promise.all([producto,talles])
			.then(([producto,talles]) => {
				return res.render('productDetail',{
					producto,
					talles
				})
			})
			.catch(error => console.log(error))

	},


    productCart: (req, res) => { res.render(path.join('productCart')) },

    list: (req, res) => {
        let categories = db.Categoria.findAll()
        let productos = db.Producto.findAll({
            include: { association: 'imagenes' }
        })
        Promise.all([categories, productos])
            .then(([categories, productos]) => {



                return res.render('productos', {
                    title: 'Express',
                    productos,
                    categories
                });
            })
            .catch((error) => res.send(error))
    }

}

module.exports = controllers