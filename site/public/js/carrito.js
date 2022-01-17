console.log('carrito.js connected success')

const $ = id => document.getElementById(id)

const boxProductos = $('box-productos');
const cantidadProductos = $('cantidad-productos')
const spanCantidad = $('span-cantidad-cart')

const cargarTabla = (carrito) => {


/*     if(boxProductos){
        if(carrito.length === 0 ){
            boxCart.style.display = 'none';
            cartEmpty.style.display = 'block';
        }else{
            boxCart.style.display = 'block';
            cartEmpty.style.display = 'none';
        }
    
    } */


    if(boxProductos){
        boxProductos.innerHTML = null;

    carrito.forEach(producto => {
        boxProductos.innerHTML += `

        <div class="productos1">

        <article class="img">

            <h4>${producto.nombre}</h4>

            <img src="/images/productos/${producto.imagen}" alt="${producto.nombre}" width="100%">

        </article>
        <article class="form">

            <div class="descripcion">
                <article class="talle1">
                    <h6>Talle</h6>
                </article>
                <article class="cantidad1">
                    <h6>Cantidad</h6>
                </article>
                <article class="total1">
                    <h6>Subtotal</h6>
                </article>
            </div>


            <div class="descripcion1">

                <article class="talle">
                    <p>${producto.talle}</p>
                </article>

                <article class="cantidad">
                    <button class="btn btn-sm btn-danger"
                        onClick="removeItem(event,${producto.id})"><i
                            class="fas fa-minus"></i></button>
                    <span>${producto.cantidad}</span>
                    <button class="btn btn-sm btn-success" onClick="addItem(event,${producto.id})"><i
                            class="fas fa-plus"></i></button>
                </article>


                <article class="total">
                    <label for="">$</label>
                    <input type="text" name="total" id="total" class="border-0" readonly value=${producto.total}> 
                </article>
            </div>



        </article>

    </div>
        `
    })
}
}

const getCarrito = async () => {
    try {

        let response = await fetch('/cart/show');
        let result = await response.json();

        console.log(result);

        cargarTabla(result.data);
        if(cantidadProductos){
            cantidadProductos.innerHTML = result.data.length;

        }
        spanCantidad.innerHTML = result.data.length;

    } catch (error) {
        console.error(error)
    }
}



const addItem = async (e, id) => {
    e.preventDefault()
    
    try {
        
        let response = await fetch('/cart/add/' + id,{
            method: 'POST'
        });
        let result = await response.json();
        cargarTabla(result.data);
        spanCantidad.innerHTML = result.data.length;



    } catch (error) {
        console.error(error)

    }
}

const removeItem = async (e, id) => {
    e.preventDefault()

    try {
        
        let response = await fetch('/cart/remove/' + id,{method:'DELETE'});
        let result = await response.json();

        console.log(result);

        cargarTabla(result.data);
        spanCantidad.innerHTML = result.data.length;


    } catch (error) {
        console.error(error)

    }
}


getCarrito();
