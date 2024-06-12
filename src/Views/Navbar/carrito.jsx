
import React from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export const Carrito = () => {

    const navigate = useNavigate();

    const goTo = (path) => {
        navigate(path);
    };

    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : "" ;
    const carritoProductos = storedCarrito.productos ? storedCarrito.productos : "";// Obtener userId desde localStorage

    const cantidadDeProductos = carritoProductos.length ? carritoProductos.length : ""

    console.log("storedCarrito;", storedCarrito)

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
}

