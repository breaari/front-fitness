// import React, { useState, useEffect } from "react";
// import { CarritoDeCompras } from "../../Components/CarritoDeCompras/carritoDeCompras";
// import { Subtotal } from "../../Components/CarritoDeCompras/subtotal";

// export const Carrito = () => {
//     // Obtener carrito desde el localStorage
//     const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || {};
//     const carritoLocal = JSON.parse(localStorage.getItem('carritoLocal')) || { productos: [] };
    
//     const usuario = JSON.parse(localStorage.getItem('user')) || {} ;
//     const userId = usuario.userId
//     // Verificar si hay un carritoId del servidor
//     const carritoId = storedCarrito.id || "";

//     // Estados para productos y carrito
//     const [productos, setProductos] = useState([]);
//     const [carrito, setCarrito] = useState(null);

//     useEffect(() => {
//         if (userId) {
//             // Si hay carrito del servidor, usar el del servidor
//             setCarrito(storedCarrito);
//         } else {
//             // Si no hay carrito del servidor, usar el carrito local
//             setCarrito(carritoLocal);
//         }
//     }, [userId]); // Solo depende de carritoId
    

//     return (
//         <div className="flex flex-row mq980:flex-col">
//            {/* Pasamos el carrito y el carritoId */}
//            <CarritoDeCompras 
//                carritoId={carritoId} 
//                setCarrito={setCarrito} 
//                carrito={carrito} 
//                setProductos={setProductos} 
//                productos={productos} 
//            />
//            <Subtotal 
//                carritoId={carritoId} 
//                setCarrito={setCarrito} 
//                carrito={carrito} 
//                setProductos={setProductos} 
//                productos={productos} 
//            />
//         </div>
//     );
// }

// import React, { useState, useEffect } from "react";
// import { CarritoDeCompras } from "../../Components/CarritoDeCompras/carritoDeCompras";
// import { Subtotal } from "../../Components/CarritoDeCompras/subtotal";

// export const Carrito = () => {
//     // Helper function to safely parse JSON
//     const safeJSONParse = (value) => {
//         try {
//             return JSON.parse(value);
//         } catch (e) {
//             return null;
//         }
//     };

//     // Obtener carrito desde el localStorage
//     const storedCarrito = safeJSONParse(localStorage.getItem('carrito')) || {};
//     const carritoLocal = safeJSONParse(localStorage.getItem('carritoLocal')) || { productos: [] };

//     console.log("Carrito Locaaaaal:", carritoLocal)
    
//     const usuario = safeJSONParse(localStorage.getItem('usuario')) || {};
//     const userId = usuario.id;
//     // Verificar si hay un carritoId del servidor
//     const carritoId = storedCarrito?.id || "";

//     console.log("userIDdD:", userId)
//     // Estados para productos y carrito
//     const [productos, setProductos] = useState([]);
//     const [carrito, setCarrito] = useState(null);

//     useEffect(() => {
//         if (userId) {
//             // Si hay carrito del servidor, usar el del servidor
//             setCarrito(storedCarrito);
//         } else {
//             // Si no hay carrito del servidor, usar el carrito local
//             setCarrito(carritoLocal);
//         }
//     }, [userId]); // Solo depende de userId
    

//     return (
//         <div className="flex flex-row mq980:flex-col">
//            {/* Pasamos el carrito y el carritoId */}
//            <CarritoDeCompras 
//                 userId = {userId}
//                carritoId={carritoId} 
//                setCarrito={setCarrito} 
//                carrito={carrito} 
//                setProductos={setProductos} 
//                productos={productos} 
//            />
//            <Subtotal 
//                carritoId={carritoId} 
//                setCarrito={setCarrito} 
//                carrito={carrito} 
//                setProductos={setProductos} 
//                productos={productos} 
//            />
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { CarritoDeCompras } from "../../Components/CarritoDeCompras/carritoDeCompras";
import { Subtotal } from "../../Components/CarritoDeCompras/subtotal";

export const Carrito = () => {
    // Helper function to safely parse JSON
    const safeJSONParse = (value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return null;
        }
    };

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState(null);
    const [carritoId, setCarritoId] = useState("");
    const [isUserCarrito, setIsUserCarrito] = useState(false);

    const usuario = safeJSONParse(localStorage.getItem('usuario')) || {};
        const userId = usuario.id;
        const storedCarrito = safeJSONParse(localStorage.getItem('carrito')) || {};
        const carritoLocal = safeJSONParse(localStorage.getItem('carritoLocal')) || { productos: [] };

    useEffect(() => {
        

        if (userId) {
            setCarrito(storedCarrito);
            setCarritoId(storedCarrito?.id || "");
            setIsUserCarrito(true);
        } else {
            setCarrito(carritoLocal);
            setCarritoId("");
            setIsUserCarrito(false);
        }
    }, []); // Solo ejecuta una vez al montar el componente

    useEffect(() => {
        const usuario = safeJSONParse(localStorage.getItem('usuario')) || {};
        const userId = usuario.id;
        const carritoLocal = safeJSONParse(localStorage.getItem('carritoLocal')) || { productos: [] };

        if (userId && !isUserCarrito && carritoLocal.productos.length > 0) {
            // Transferir carrito local al servidor si hay un nuevo userId
            transferirCarritoLocalAUsuario();
        }
    }, [carrito, isUserCarrito]); // Ejecuta cuando cambia el carrito o el tipo de carrito

    const transferirCarritoLocalAUsuario = async () => {
        const usuario = safeJSONParse(localStorage.getItem('usuario')) || {};
        const userId = usuario.id;
        const carritoLocal = safeJSONParse(localStorage.getItem('carritoLocal')) || { productos: [] };

        if (userId && carritoLocal.productos.length > 0) {
            try {
                // Crear el input para la actualización del carrito del usuario
                const input = {
                    userId: userId,
                    productos: carritoLocal.productos.map(producto => ({
                        productId: producto.productId,
                        cantidad: producto.cantidad,
                    })),
                };

                const response = await axios.put('/carrito', input, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data.success) {
                    // Limpiar el carrito local después de la transferencia
                    localStorage.removeItem('carritoLocal');

                    // Actualizar el estado del carrito en el servidor
                    setCarrito(response.data.carrito);
                    // Actualizar también el carrito en localStorage si es necesario
                    localStorage.setItem('carrito', JSON.stringify(response.data.carrito));
                } else {
                    console.error('Error al transferir el carrito local al carrito del usuario.');
                }
            } catch (error) {
                console.error('Error al transferir el carrito local al carrito del usuario:', error);
            }
        }
    };

    return (
        <div className="flex flex-row mq980:flex-col">
           {/* Pasamos el carrito y el carritoId */}
           <CarritoDeCompras 
                userId={userId}
                carritoId={carritoId} 
                setCarrito={setCarrito} 
                carrito={carrito} 
                setProductos={setProductos} 
                productos={productos} 
           />
           <Subtotal 
               carritoId={carritoId} 
               setCarrito={setCarrito} 
               carrito={carrito} 
               setProductos={setProductos} 
               productos={productos} 
           />
        </div>
    );
};
