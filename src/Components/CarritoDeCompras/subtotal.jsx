import React, { useEffect, useState } from "react";
// import { OpcionesDeEnvio } from "./opcionesEnvio";
// import { EnvioGratis } from "./envioGratis";
// import { EnvioCorreo } from "./envioCorreo";
import axios from 'axios';
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { ModalPago } from "./modalPago";
// import { useLocation } from "react-router-dom";
// import { PagoExitoso } from "../mercadoPago/pagoExitoso";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarraCompras } from "./barracompras";
import { ModalTelefonoSI } from "./modalTelefonoSI";

export const Subtotal = ({ carrito, productos, setProductos, setCarrito, carritoId }) => {

    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [subtotalDescuento, setSubtotalDescuento] = useState((subtotal - discount))
    // const totalProductos = carrito ? carrito.productos.length : 0;
    const totalProductos = carrito ? carrito.length : 0;

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
        console.log("carritoe:", carrito)
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
        userId: userId ? userId : "",
        telefono: "",
        pedido: totalProductos !== 0 ? carrito.productos.map(productoEnCarrito => {
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

    const [telefonoSI, setTelefonoSI ] = useState(false)

    const updateTelefono = (telefono) => {
        setInput((prevInput) => ({
          ...prevInput,
          telefono: telefono, // Asignar el número de teléfono al userId
        }));
      };
      console.log("AAA:", carrito)
      // Función para mostrar/ocultar el modal
      const toggleTelefonoSI = () => {
        setTelefonoSI(!telefonoSI);
      };
      
      const handleSubmit = async () => {
        if (!input.telefono) {
          setTelefonoSI(true); // Mostrar el modal si no hay userId
          return; // Salir de la función para esperar a que se ingrese el teléfono
        }
         console.log("input:", input)
      
        try {
          const response = await axios.post("/pedido", input);
          const id_pedido = response.data.pedido.id;
          localStorage.setItem("lastPedidoId", id_pedido);
       
          if (response.data.success) {
            setModalPago(true);
           
            setCarrito({ ...carrito, productos: [] });
            setSubtotal(0);
            localStorage.removeItem("carritoLocal");
            if (carritoId) {
                await axios.put("/carrito", { carritoId: carritoId, vaciarCarrito: true });
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      console.log("subtotlll", subtotal)
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
                    {telefonoSI && (
                        <ModalTelefonoSI updateTelefono={updateTelefono} toggleTelefonoSI={toggleTelefonoSI} />
                    )}
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
