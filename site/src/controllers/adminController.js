const { Producto, Categoria, Talle, Sexo, Coleccion, Color, Imagen } = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {

    
    
        /* Muestra todos los productos */
        list : async (req,res) => {
            try{
                const productos = await Producto.findAll({include: [{all : true}]});
                res.render('admin/admin', { productos, toThousand });
            } catch(error){
                console.log(error);
            }
        },
        /* Muestra el detalle de un producto */
        detail: async (req,res) => {
            try {
                const quantities = [1,2,3,4,5,6,7,8,9,10];
                const {id} = req.params;
                const productDetail = await Producto.findByPk(id, {include: ['Categoria']});          
                res.render('/productDetail', {productDetail, toThousand, quantities}); 
                // res.json(quantities);
            } catch (error) {
                console.log(error);
            }
        },

   
    //Creacion de un producto

    create: async (req,res) => {
        try {                
            const categorias = await Categoria.findAll();
            const talles = await Talle.findAll();
            const generos = await Sexo.findAll();
            const colecciones = await Coleccion.findAll();
            const colores = await Color.findAll();
            res.render('admin/create', {
                categorias,
                talles,
                generos,
                colecciones,
                colores
            });          
            }
        catch(error) {
            console.log(error);
        }
    },  
    //Metodo de creacion

    store: async (req, res, next) => {
        let results = validationResult(req);
        const {nombre, precio, categoria, color, descripcion, coleccion, genero, talle} = req.body;
        if (results.isEmpty()) {

            try {
                let producto = await Producto.create({
                    nombre,
                    precio,
                    id_categoria : categoria,
                    id_colores : color,
                    id_talles : talle,
                    id_sexo : genero,
                    id_coleccion : coleccion,
                    descripcion
                });

                if(req.file){
                    await Imagen.create({
                        nombre : req.file.filename,
                        productos_id : producto.id
                    })
                }
                res.redirect('/admin');
            } catch (error) {
                console.log(error);
            }
        } else {
            res.render('admin/create', {categories, errors: results.errors});
        }
    },  
    //Update - formulario a editar

    edit: async (req,res) => {
        try {          
            const { id } = req.params;
            const product = await Producto.findByPk(id, {include: [{all: true}]});
            const categories = await Categoria.findAll();
            const talles = await Talle.findAll();
            const generos = await Sexo.findAll();
            const colecciones = await Coleccion.findAll();
            const colores = await Color.findAll();
            res.render('admin/edit', { 
                product, 
                toThousand, 
                categories,
                colores,
                talles,
                colecciones,
                generos
            });
        } catch(error) {
            console.log(error);
        }
    },

    //update - metodo para editar

    update: async (req, res, next) => {

        let results = validationResult(req);
        let productDetail;
        const {title, color, talle, genero, coleccion, precio} = req.body;
        const {id} = req.params;

        try {
            productDetail = await Producto.findByPk(id, {include: {all: true}});  
        } catch (error) {
            console.log(error);
        }
        if (results.isEmpty()) {
            try {
                await Producto.update(
                    {
                        nombre : title,
                        id_colores : color,
                        id_talles : talle,
                        id_sexo : genero,
                        id_coleccion : coleccion,
                        precio 
                    },
                    {
                        where : {
                            id 
                        }
                    }
                )

                if (req.file) {

                    if(productDetail.imagenes[0]){
                        await Imagen.update(
                            {
                                nombre : req.file.filename
                            },
                            {
                                where : {
                                    productos_id : id
                                }
                            }
                        )

                    }else{
                        await Imagen.create({
                            nombre : req.file.filename,
                            productos_id : productDetail.id
                        })
                    }

                } 
                return res.redirect('/admin')

            } catch (error) {
                console.log(error);
            }
        } else {

            const { id } = req.params;
            const product = await Producto.findByPk(id, {include: [{all: true}]});
            const categories = await Categoria.findAll();
            const talles = await Talle.findAll();
            const generos = await Sexo.findAll();
            const colecciones = await Coleccion.findAll();
            const colores = await Color.findAll();
            res.render('admin/edit', { 
                product, 
                toThousand, 
                categories,
                colores,
                talles,
                colecciones,
                generos,
                errors: results.errors

            });
        }
    }, 

    //Borrar un producto 

    destroy: async (req, res) => {
        try {
            const {id} = req.params;
            await Producto.destroy({
                where : {
                    id
                }
            });
            res.redirect('/admin');
        } catch (error) {
            console.log(error);
        }
    }, 

    //Buscar

    search: async(req, res) => {
        try {
            let {search} = req.query;
            let products = await Producto.findAll({
                where: {
                    name: {[Op.like] : '%' + search + '%'}
                }
            });
            res.render('index', {products, toThousand});
        } catch (error) {
            res.render(error);
            console.log(error);
        }
    }
}
