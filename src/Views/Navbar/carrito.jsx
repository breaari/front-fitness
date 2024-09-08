
// import React from 'react';
// import { HiOutlineShoppingCart } from 'react-icons/hi';
// import { useNavigate } from 'react-router-dom';

// export const Carrito = () => {

//     const navigate = useNavigate();

//     const goTo = (path) => {
//         navigate(path);
//     };

//     const storedCarrito = JSON.parse(localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : "" ;
//     const carritoProductos = storedCarrito.productos ? storedCarrito.productos : "";// Obtener userId desde localStorage

//     const cantidadDeProductos = carritoProductos.length ? carritoProductos.length : ""

//     console.log("storedCarrito;", storedCarrito)

//   return (
//     <div className='relative cursor-pointer' onClick={() => goTo('/carritodecompras')}>
//       <HiOutlineShoppingCart className='text-[30px] text-white' />
//       {cantidadDeProductos > 0 && (
//         <div className='absolute bottom-[-5px] left-[-5px] bg-rojo text-white rounded-full h-[20px] w-[20px] flex items-center justify-center text-[12px]'>
//           {cantidadDeProductos}
//         </div>
//       )}
//     </div>
//   );
// }

import React from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export const Carrito = () => {
    const navigate = useNavigate();

    const goTo = (path) => {
        navigate(path);
    };

    // Helper function to safely parse JSON
    const safeJSONParse = (value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return null;
        }
    };

    // Obtener carrito desde el localStorage
    const storedCarrito = safeJSONParse(localStorage.getItem('carrito')) || { productos: [] };
    const carritoLocal = safeJSONParse(localStorage.getItem('carritoLocal')) || { productos: [] };
    const usuario = safeJSONParse(localStorage.getItem('user')) || {};
    const userId = usuario.userId;

    // Elegir el carrito correcto basado en la presencia de userId
    const carritoProductos = userId ? storedCarrito.productos : carritoLocal.productos;

    // Contar la cantidad total de productos
    const cantidadDeProductos = carritoProductos.reduce((total, producto) => total + producto.cantidad, 0);

    return (
        <div className='relative cursor-pointer' onClick={() => goTo('/carritodecompras')}>
            <HiOutlineShoppingCart className='text-[30px] text-white' />
            {cantidadDeProductos > 0 && (
                <div className='absolute bottom-[-5px] left-[-5px] bg-rojo text-white rounded-full h-[20px] w-[20px] flex items-center justify-center text-[12px]'>
                    {cantidadDeProductos}
                </div>
            )}
        </div>
    );
};
