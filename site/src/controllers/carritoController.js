const getURL = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
const db = require('../database/models');

const productVerify = (carrito, id) => {
    let index = -1;
    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].id == id) {
            index = i;
            break
        }
    }
    return index
}

module.exports = {
    show: async (req, res) => {

        let response = {
            meta: {
                link: getURL(req)
            },
            data: req.session.cart
        }
        return res.status(200).json(response)
    },
    add: async (req, res) => {
        try {
            let producto = await db.Producto.findByPk(req.params.id, {
                include: [{ all: true }]
            })

            let item = {
                id: producto.id,
                nombre: producto.nombre,
                imagen: producto.imagenes[0].nombre,
                precio: producto.precio,
                cantidad: 1,
                talle: producto.talles.nombre,
                total: producto.precio,
            }

            if (req.session.cart.length === 0) {

                let orden = await db.Orden.findOne({
                    where: {
                        id_usuario: req.session.usuarioLogin.id,
                        estado: 'pendiente'
                    }
                })

                if (!orden) {
                    orden = await db.Orden.create({
                        id_usuario: req.session.usuarioLogin.id,
                        estado: 'pendiente'
                    })
                }

                item = {
                    ...item,
                    id_orden: orden.id
                }

                req.session.cart.push(item);

                await db.Carrito.create({
                    id_usuario: req.session.usuarioLogin.id,
                    id_producto: item.id,
                    id_orden: item.id_orden,
                    cantidad: item.cantidad,
                })

            } else {

                let index = productVerify(req.session.cart, req.params.id);
                let orden = await db.Orden.findOne({
                    where: {
                        id_usuario: req.session.usuarioLogin.id,
                        estado: 'pendiente'
                    }
                })


                if(index === -1){
                    
                    item = {
                        ...item,
                        id_orden: orden.id
                    }

                    req.session.cart.push(item);

                    await db.Carrito.create({
                        id_usuario: req.session.usuarioLogin.id,
                        id_producto: item.id,
                        id_orden: item.id_orden,
                        cantidad: item.cantidad,
                    })
                }else{

                    let producto = req.session.cart[index];
                    producto.cantidad++;
                    producto.total = producto.cantidad * +producto.precio;

                    req.session.cart[index] = producto;

                    await db.Carrito.update(
                        {
                            cantidad : producto.cantidad
                        },
                        {
                            where : {
                                id_orden : producto.id_orden,
                                id_producto : producto.id
                            }
                        }
                    )
                }
            }

            let response = {
                meta : {
                    link : getURL(req)
                },
                data : req.session.cart
            }

            return res.status(200).json(response)


        } catch (error) {

            console.log(error)

            return res.status(500).json({
                msg: "Comuníquese con el administrador"
            })
        }
    },
    remove : async (req,res) => {
        try {
            
            let index = productVerify(req.session.cart, req.params.id);
            let producto = req.session.cart[index];

            if(producto.cantidad > 1){

                producto.cantidad--;
                producto.total = producto.cantidad * producto.precio;
                req.session.cart[index] = producto

                await db.Carrito.update(
                    {
                        cantidad : producto.cantidad
                    },
                    {
                        where : {
                            id_orden : producto.id_orden,
                            id_producto : producto.id
                        }
                    }
                )
            }else{
                req.session.cart.splice(index, 1);

                await db.Carrito.destroy({
                    where : {
                        id_orden : producto.id_orden,
                        id_producto : producto.id
                    }
                })
            }

            let response = {
                meta : {
                    link : getURL(req)
                },
                data : req.session.cart
            }
    
            return res.status(200).json(response)
            
        } catch (error) {
            console.log(error)

            return res.status(500).json({
                msg: "Comuníquese con el administrador"
            })
        }
    }
}