// import { useEffect, useState } from "react";
// import { OpcionesDeEnvio } from "./opcionesEnvio";
// import { EnvioGratis } from "./envioGratis";
// import { EnvioCorreo } from "./envioCorreo";
// import axios from 'axios'
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
// import { ModalPago } from "./modalPago";
// import { useLocation } from "react-router-dom";
// import { PagoExitoso } from "../mercadoPago/pagoExitoso";
// import { ToastContainer, Zoom, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarraCompras } from "./barracompras";


// export const Subtotal = ({carrito, productos, setProductos, setCarrito, carritoId}) => {

//     const [subtotal, setSubtotal] = useState(0);
//     const totalProductos = carrito ? carrito.productos.length : 0


//     useEffect(() => {
   
//       if (productos.length > 0) {
//           let total = 0;

//           productos.forEach((producto) => {
              
//               const precio = parseFloat(producto.preciopromo) || parseFloat(producto.precioventa);
//               total += precio * producto.cantidad;
//           });

//             setSubtotal(total.toFixed(2));
//         }
//     }, [productos]);

//     useEffect(() => {
//       if (carrito && carrito.productos && productos && productos.length > 0) {
// console.log("productoslemg:", productos.length)
//         console.log("gola no sot el else")
//         setInput((prevInput) => ({
//           ...prevInput,
//           pedido: carrito.productos.map((productoEnCarrito) => {

//             const producto = productos.find(p => p.id.toString() === productoEnCarrito.productId.toString());

//             return {
//               productId: productoEnCarrito.productId,
//               cantidad: productoEnCarrito.cantidad,
//               precioVenta: producto ? producto.precioventa : 0,
//               precioPromo: producto ? producto.preciopromo : 0
//             };
//           }),
//           total: subtotal,
//         }));
        
//       } else {
//         console.log("Datos insuficientes para procesar el pedido");
//       }
//     }, [carrito, productos, subtotal]);
    
//     const userId = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")).id : null;

//     const initialInput = {
//       userId: userId,
//       pedido: carrito ? carrito.productos.map(productoEnCarrito => {
//         const producto = productos.find(p => p.id === productoEnCarrito.productId);
//         return {
//           productId: productoEnCarrito.productId,
//           cantidad: productoEnCarrito.cantidad,
//           precioVenta: producto ? producto.precioventa : 0,
//           precioPromo: producto ? producto.preciopromo : 0
//         };
//       }) : [],
//       estado: "pendiente",
//       total: subtotal,

//     };
  
//   const [input, setInput] = useState(initialInput)

//   const handleChange = (data) => {
//     setInput({
//         ...input,
//         ...data
//     });
//   };

// const handleSubmit = async () => {
//   try {
//     const response = await axios.post("/pedido", input);
//     console.log("responde:", response)
//     const id_pedido = response.data.pedido.id
//     localStorage.setItem("lastPedidoId", id_pedido);
//     console.log("laputa;", localStorage.getItem("lastPedidoId"))
//     if (response.data.success) {
//     setModalPago(true)
//     await axios.put("/carrito", { carritoId: carritoId, vaciarCarrito: true });
//     setCarrito({ ...carrito, productos: [] });
//     setSubtotal(0);
//     }

//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// const [modalPago, setModalPago] = useState(false)

// const toggleModalPago = () => {
//   setModalPago(!modalPago);
// };

// const pedido_id = localStorage.getItem("lastPedidoId")
// console.log("laputa;", localStorage.getItem("lastPedidoId"))

//     return (

//     <div className={`mt-[74px] w-[40%] mq980:w-full mq980:mt-0 mq980:mb-6 ${!productos.length ? 'text-gray-200' : ''}`}>
//     <div className={`mx-6 pt-4 pb-8 px-12 border ${!productos.length ? 'border-gray-200' : 'border-gray-200 shadow-md'} mt-10`}>
//       <h1 className="italic text-xl font-bold p-4 text-center">RESUMEN DE COMPRA</h1>
//       <div className="flex flex-col">
//         <div className="flex flex-row justify-between">
//           <p>Total productos({totalProductos})</p>
//           <p>${subtotal}</p>
//         </div>
//         <div className="flex flex-row justify-between">
//         <p className="text-rojo">Descuentos</p>
//         </div>
  
//         <div className="flex justify-center items-center mt-8">
//           <button 
//             className={`rounded-sm py-2 px-4 text-lg font-semibold ${!productos.length ? 'bg-gray-200 text-white cursor-not-allowed' : 'bg-rojo hover:bg-black text-white'}`} 
//             onClick={handleSubmit}
//             disabled={!productos.length}
//           >
//             Finalizar compra
//           </button>
          
//         </div>
        
//         { modalPago && (
//           <ModalPago toggleModalPago={toggleModalPago} idpedido={pedido_id}
//           >

//           </ModalPago>
//         )}

//       </div>
//     </div>
//     <div className="">
//       <BarraCompras subtotal={subtotal}></BarraCompras>
//     </div>
//     <ToastContainer
//                   position="top-right"
//                   autoClose={5000}
//                   hideProgressBar={false}
//                   newestOnTop={false}
//                   closeOnClick
//                   rtl={false}
//                   pauseOnFocusLoss
//                   draggable
//                   pauseOnHover
//                   limit={1}
//                   queue={false}
//                   theme="colored"
//                   transition={Zoom}
//                 />
//   </div>

//     )
// }

import React, { useEffect, useState } from "react";
import { OpcionesDeEnvio } from "./opcionesEnvio";
import { EnvioGratis } from "./envioGratis";
import { EnvioCorreo } from "./envioCorreo";
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { ModalPago } from "./modalPago";
import { useLocation } from "react-router-dom";
import { PagoExitoso } from "../mercadoPago/pagoExitoso";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarraCompras } from "./barracompras";

export const Subtotal = ({ carrito, productos, setProductos, setCarrito, carritoId }) => {
    const [subtotal, setSubtotal] = useState(0);
 

    const [discount, setDiscount] = useState(0);
    const [subtotalDescuento, setSubtotalDescuento] = useState((subtotal - discount))
    const totalProductos = carrito ? carrito.productos.length : 0;

    useEffect(() => {
        if (productos.length > 0) {
            let total = 0;
            productos.forEach((producto) => {
                const precio = parseFloat(producto.preciopromo) || parseFloat(producto.precioventa);
                total += precio * producto.cantidad;
            });

            setSubtotal(total.toFixed(2));
        }
    }, [productos]);

    useEffect(() => {
        let discount = 0;
        if (subtotal > 200000) {
            discount = subtotal * 0.10;
        } else if (subtotal > 100000) {
            discount = subtotal * 0.05;
        }
        setDiscount(discount.toFixed(2));
    }, [subtotal]);

    useEffect(() => {
      setSubtotalDescuento((subtotal - discount).toFixed(2));
  }, [subtotal, discount]);

    useEffect(() => {
        if (carrito && carrito.productos && productos && productos.length > 0) {
            setInput((prevInput) => ({
                ...prevInput,
                pedido: carrito.productos.map((productoEnCarrito) => {
                    const producto = productos.find(p => p.id.toString() === productoEnCarrito.productId.toString());
                    return {
                        productId: productoEnCarrito.productId,
                        cantidad: productoEnCarrito.cantidad,
                        precioVenta: producto ? producto.precioventa : 0,
                        precioPromo: producto ? producto.preciopromo : 0
                    };
                }),
                total: subtotalDescuento,
                subtotal: subtotal
            }));
        } else {
            console.log("Datos insuficientes para procesar el pedido");
        }
    }, [carrito, productos, subtotal]);

    const userId = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")).id : null;

    const initialInput = {
        userId: userId,
        pedido: carrito ? carrito.productos.map(productoEnCarrito => {
            const producto = productos.find(p => p.id === productoEnCarrito.productId);
            return {
                productId: productoEnCarrito.productId,
                cantidad: productoEnCarrito.cantidad,
                precioVenta: producto ? producto.precioventa : 0,
                precioPromo: producto ? producto.preciopromo : 0
            };
        }) : [],
        estado: "pendiente",
        total: subtotalDescuento,
        subtotal: subtotal
    };

    const [input, setInput] = useState(initialInput);

    const handleChange = (data) => {
        setInput({
            ...input,
            ...data
        });
    };

    console.log("inout:", input)

    const handleSubmit = async () => {
        try {
            const response = await axios.post("/pedido", input);
            const id_pedido = response.data.pedido.id;
            localStorage.setItem("lastPedidoId", id_pedido);
            if (response.data.success) {
                setModalPago(true);
                await axios.put("/carrito", { carritoId: carritoId, vaciarCarrito: true });
                setCarrito({ ...carrito, productos: [] });
                setSubtotal(0);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const [modalPago, setModalPago] = useState(false);

    const toggleModalPago = () => {
        setModalPago(!modalPago);
    };

    const pedido_id = localStorage.getItem("lastPedidoId");

    return (
        <div className={`mt-[74px] w-[40%] mq980:w-full mq980:mt-0 mq980:mb-6 ${!productos.length ? 'text-gray-200' : ''}`}>
            <div className={`mx-6 pt-4 pb-8 px-12 border ${!productos.length ? 'border-gray-200' : 'border-gray-200 shadow-md'} mt-10`}>
                <h1 className="italic text-xl font-bold p-4 text-center">RESUMEN DE COMPRA</h1>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <p>Total productos({totalProductos})</p>
                        <p>${subtotal}</p>
                    </div>
                    { discount !== "0.00" && (
                      <div>
                        <div className="flex flex-row justify-between">
                        <p className="text-rojo">Descuentos</p>
                        <p className="text-rojo">-${discount}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Total con descuento</p>
                        <p>${(subtotal - discount).toFixed(2)}</p>
                    </div>
                       </div> 
                    )}
                    <div className="flex justify-center items-center mt-8">
                        <button 
                            className={`rounded-sm py-2 px-4 text-lg font-semibold ${!productos.length ? 'bg-gray-200 text-white cursor-not-allowed' : 'bg-rojo hover:bg-black text-white'}`} 
                            onClick={handleSubmit}
                            disabled={!productos.length}
                        >
                            Finalizar compra
                        </button>
                    </div>
                    {modalPago && (
                        <ModalPago toggleModalPago={toggleModalPago} idpedido={pedido_id} />
                    )}
                </div>
            </div>
            <div className="">
                <BarraCompras subtotal={subtotal} productos={productos}></BarraCompras>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
                queue={false}
                theme="colored"
                transition={Zoom}
            />
        </div>
    );
}
