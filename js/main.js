//Creo array vacio
let carrito = [];

//Creo una clase donde ingresar los productos
class Producto {
    constructor(producto) {
        this.id = producto.id;
        this.nombre = producto.nombre;
        this.tipo = producto.tipo;
        this.precio = producto.precio;
        this.img = producto.img;
        this.cantidad = producto.cantidad ?? 1;
    }

    agregar() {
        this.cantidad++;
    }

    quitar() {
        this.cantidad--;
    }
}

// Declaro funciones a utilizar

//Funcion que permite agregar al carrito un nuevo producto mediante el ID.
function agregarAlCarrito(producto) {
    let existente = carrito.find(el => el.id === producto.id);
    if (existente) {
        existente.agregar();
    } else {
        let nuevoProducto = new Producto(producto);
        carrito.push(nuevoProducto);
    }
    localStorage.setItem('carritoEnStorage', JSON.stringify(carrito));
    actualizarCarrito();
}

//Funcion que permite eliminar un producto del array vacio "carrito"
function eliminarDelCarrito(producto) {
    let index = carrito.indexOf(carrito.find(el => el.id === producto.id));
    if (carrito[index].cantidad > 1) {
        carrito[index].quitar();
    } else {
        if(carrito.length === 1){
            vaciarCarrito();
        }
        else{
            carrito.splice(index, 1);
        }
    }
    
    localStorage.setItem('carritoEnStorage', JSON.stringify(carrito));
    actualizarCarrito();
}

//Funcion que crear las cards de productos en HTML mediante JS.
function crearCardProductosHTML() {
    let contenedor = document.getElementById('main-container_id');
    contenedor.innerHTML = '';
    fetch('./js/data.json')
        .then((res)=>res.json())
        .then((data)=>{
            data.forEach((producto)=>{
                let card = document.createElement('div');
                card.innerHTML = `       
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top imagen-kiosco" src=${producto.img} alt="Card image cap" />
                        <div class="card-body">
                            <h3 class="card-title">${producto.nombre}</h3>
                            <h5 class="card-title">${producto.tipo}</h5>
                            <p class="card-text">$${producto.precio}</p>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button id="agregar${producto.tipo}${producto.id}" type="button" class="btn btn-dark"> Agregar </button>
                            </div>
                        </div>
                    </div>`;
                contenedor.appendChild(card);
                let boton = document.getElementById(
                `agregar${producto.tipo}${producto.id}`
                );
                boton.addEventListener('click', () => agregarAlCarrito(producto));
                boton.addEventListener('click', () => {
                    Toastify({
                        text: "Has agregado el producto al carrito.",
                        duration: 1500,
                        gravity: "bottom",
                        position: "right",
                        stopOnFocus: true,
                        style: {
                            width: "300px",
                            height: "auto",
                            fontSize: "24px",
                            fontStyle: "italic",
                            background: "#BAB4B4",
                        }
                    }).showToast();
                })
            })
        })
}

//Funcion que actualiza la lista del carrito.
function actualizarCarrito() {
    let contenedor = document.getElementById('carrito-container');

    if (carrito.length === 0) {
        contenedor.innerHTML = '<h3 class="dropdown-header">Agregue productos a su carrito.</h3>';
        return;
    }

    contenedor.innerHTML = `
        <li>
            <table id="tabla-carrito" class="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Precio Total</th>
                        <th>Accion</th>
                    </tr>

                    <tbody id="bodyTabla">

                    </tbody>
                </thead>
            </table>
        </li>`;

    let bodyTabla = document.getElementById('bodyTabla');
    for (const kiosco of carrito) {
        let datos = document.createElement('tr');
        datos.innerHTML = `
            <td><img src=${kiosco.img} alt="Card image cap" width="100px" height="100px"/></td>
            <td>${kiosco.nombre}</td>
            <td>${kiosco.cantidad}</td>
            <td>${kiosco.precio}</td>
            <td>${kiosco.precio * kiosco.cantidad}</td>
            <td><button id="eliminar${kiosco.id}" class="btn btn-red">Eliminar</button></td>
            `;

        bodyTabla.appendChild(datos);

        let boton = document.getElementById(`eliminar${kiosco.id}`);
        boton.addEventListener('click', () => eliminarDelCarrito(kiosco));
        boton.addEventListener('click', () => {
            Toastify({
                text: "Has eliminado el producto del carrito.",
                duration: 1500,
                gravity: "bottom", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    width: "300px",
                    height: "auto",
                    fontSize: "24px",
                    fontStyle: "italic",
                    background: "#454B4B",
                }
            }).showToast();
        })
    }

    let precioTotal = obtenerPrecioTotal(carrito);
    let accionesCarrito = document.getElementById('acciones-id');
    accionesCarrito.innerHTML = `
            <h6>Precio Final: $${precioTotal}</h6></br>
            <button id="vaciarCarrito" class="btn btn-dark">Vaciar Carrito</button>`;
    let boton = document.getElementById(`vaciarCarrito`);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    boton.addEventListener('click', () => {
        swalWithBootstrapButtons.fire({
            title: 'Estás seguro de que querés vaciar el carrito?',
            text: "No hay vuelta atrás!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, vacíalo!',
            cancelButtonText: 'No, cancélalo!',
            reverseButtons: false
        }).then((result) => {
            if(result.isConfirmed){
                swalWithBootstrapButtons.fire(
                    'Vaciado!',
                    'Tu carrito ahora está vacío.',
                    'success',
                    vaciarCarrito()
                )
            }else if (result.dismiss === Swal.DismissReason.cancel){
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'Tu carrito está intacto.',
                    'error'
                )
            }
        })
    })
}


//Funcion que calcula el total del valor tomado en la variables precio.
function obtenerPrecioTotal(array) {
  return array.reduce(
    (total, elemento) => total + elemento.precio * elemento.cantidad,0
  );
}

//Funcion que vacia completamente ek carrito mediante un boton.
function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem('carritoEnStorage');
  document.getElementById('carrito-container').innerHTML = '<h3 class="dropdown-header">Agregue productos a su carrito.</h3>';
  document.getElementById('acciones-id').innerHTML = '';
}

//Funcion que chequea si en el storage hay items almacenados, en caso que se encuentren se pushean en un nuevo array el cual aparece al recargar la pagina como carrito. 
function chequearCarritoEnStorage() {
  let array = [];
  let contenidoEnStorage = JSON.parse(localStorage.getItem('carritoEnStorage'));
  if (contenidoEnStorage) {
    for (const objeto of contenidoEnStorage) {
      let recuproducto = new Producto(objeto);
      array.push(recuproducto);
    }
  }
  return array;
}

document.addEventListener('DOMContentLoaded', function () {
  crearCardProductosHTML();
  carrito = chequearCarritoEnStorage();
  actualizarCarrito();
});