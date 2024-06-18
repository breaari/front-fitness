import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TbShoppingCartBolt } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { TbShoppingBagCheck } from "react-icons/tb";
import { Link } from 'react-router-dom'

export const CarritoDeCompras = ({ carritoId, setProductos, productos, setCarrito, carrito }) => {

    const fetchCarritoActualizado = async () => {
        try {
            const response = await axios.get(`/carrito/${carritoId}`);
            if (response.data.success) {
                localStorage.setItem('carrito', JSON.stringify(response.data.carrito));
            } else {
                if (!toast.isActive('error-toast')) {
                    toast.error('Error al obtener el carrito actualizado.', {
                        toastId: 'error-toast',
                    });
                }
            }
        } catch (error) {
            if (!toast.isActive('error-toast')) {
                toast.error('Error al obtener el carrito actualizado. Por favor, inténtelo de nuevo más tarde.', {
                    toastId: 'error-toast',
                });
            }
        }
    };
  
    useEffect(() => {
        const fetchCarrito = async (carritoId) => {
            if (carritoId) {
                const response = await axios.get(`/carrito/${carritoId}`);
                setCarrito(response.data.carrito);
                
            }
        };

        fetchCarrito(carritoId);
    }, [carritoId]);

    useEffect(() => {
        const fetchProductos = async () => {
            if (carrito && carrito.productos && carrito.productos.length > 0) {
                const productosDetalles = await Promise.all(carrito.productos.map(async (item) => {
                    const response = await axios.get(`/productos/${item.productId}`);
                    return {
                        ...item,
                        ...response.data.producto,
                    };
                }));
                setProductos(productosDetalles);
            } else {
                setProductos([]);
            }
        };

        fetchProductos();
    }, [carrito]);

    const calcularDescuento = (precioventa, preciopromo) => {
        if (isNaN(preciopromo) || preciopromo === null || preciopromo >= precioventa) {
            return null;
        }
        const descuento = ((precioventa - preciopromo) / precioventa) * 100;
        return Math.round(descuento);
    };

    const calcularSubtotal = (precio, cantidad) => {
        return (precio * cantidad).toFixed(2);
    };


    const actualizarCantidad = async (productId, nuevaCantidad) => {
        console.log("nuevacatidad;", nuevaCantidad)

        const updatedProductos = productos.map((producto) => 
            producto.productId === productId ? { ...producto, cantidad: nuevaCantidad } : producto
        );
        setProductos(updatedProductos);
        fetchCarritoActualizado();

        const input = {
            carritoId: carrito.id,
            productId: productId,
            cantidad: nuevaCantidad,
            estado: "pendiente"
        };

        console.log("input:", input)

        try {
            const response = await axios.put('/carrito', input, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                setCarrito(response.data.carrito);
            }
    
        } catch (error) {
            alert('Error al actualizar la cantidad. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    const handleInputCantidadChange = (e, productId) => {
        const nuevaCantidad = parseInt(e.target.value, 10);

            actualizarCantidad(productId, nuevaCantidad);

    };


    const eliminarProducto = async (productId) => {
        const input = {
            carritoId: carrito.id,
            productId: productId,
            cantidad: 0 // Establecer la cantidad en 0 para eliminar el producto del carrito
        };

        try {
            const response = await axios.put('/carrito', input, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                const updatedCarrito = await axios.get(`/carrito/${carrito.id}`);
                setCarrito(updatedCarrito.data.carrito);
                fetchCarritoActualizado();
            }
        } catch (error) {
            alert('Error al eliminar el producto. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    return (
        <div className='mt-[74px] w-[60%] p-4 min-h-[515px] mq980:min-h-[20px] mq980:w-full'>
            <div className='flex flex-row items-center p-4'>
                <TbShoppingCartBolt className="text-[38px]" />
                <h1 className='italic font-bold text-2xl'>CARRITO DE COMPRAS</h1>
            </div>
            <div>
                {productos.length ?  (productos.map((producto, index) => {
                    const descuento = calcularDescuento(parseFloat(producto.precioventa), parseFloat(producto.preciopromo));
                    const precioFinal = !isNaN(producto.preciopromo) && producto.preciopromo !== null ? producto.preciopromo : producto.precioventa;
                    const subtotal = calcularSubtotal(precioFinal, producto.cantidad);
  
                    return (
                        <div key={index} className="flex flex-row items-center border border-sm w-full my-1 shadow-md">
                            <div className='w-[15%] mq980:w-[25%]'>
                                <img 
                                    src={`https://back.paravosdistribuidora.com.ar/${producto.imagen.split(',')[0]}`} 
                                    alt={producto.name} 
                                    className="w-20 h-20 m-2 object-cover shadow-md" 
                                />
                            </div>
                            <div className='flex flex-col w-[85%] px-2 mq980:w-[75%]'>
                                
                                <div className='w-[35%] mq980:w-full'>
                                    <h2 className="text-xl font-semibold">{producto.name}</h2>
                                </div>
                                <div className="flex items-center">
                                    {!isNaN(producto.preciopromo) && producto.preciopromo !== null ? (
                                        <div className="w-[35%]">
                                            <div className="flex flex-row">
                                                <p className="text-gris line-through">${producto.precioventa}</p>
                                                <p className="ml-1 font-semibold">${producto.preciopromo}</p>
                                            </div>
                                            <p className="text-green-700">{descuento}% de descuento</p>
                                        </div>
                                    ) : (
                                        <p className="font-semibold w-[35%]">${producto.precioventa}</p>
                                    )}
                                
                                    <div className="flex items-center w-[35%]">
                                        {producto.cantidad === 1 || producto.cantidad === 0 || !producto.cantidad ? (
                                            <div className='flex bg-rojo w-[30px] h-[30px] items-center justify-center cursor-pointer rounded-tl-sm rounded-bl-sm'>
                                                <RiDeleteBin6Fill 
                                                    className="text-white text-[18px]" 
                                                    onClick={() => eliminarProducto(producto.productId)}
                                                />
                                            </div>
                                        ) : (
                                            <button 
                                                className="w-[30px] h-[30px] bg-gray-200 hover:bg-gray-300 focus:outline-none rounded-tl-sm rounded-bl-sm"
                                                onClick={() => actualizarCantidad(producto.productId, producto.cantidad - 1)}
                                            >
                                                -
                                            </button>
                                        )}
                                        <input 
                                            type="number"
                                            className="w-[50px] h-[30px] p-1 focus:outline-none text-center border-y border-gray-200"
                                            value={producto.cantidad}
                                            min="1"
                                            onChange={(e) => handleInputCantidadChange(e, producto.productId)}
                                        />
                                        <button 
                                            className="w-[30px] h-[30px] bg-gray-200 rounded-tr-sm rounded-br-sm hover:bg-gray-300 focus:outline-none border-y border-gray-200"
                                            onClick={() => actualizarCantidad(producto.productId, producto.cantidad + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className='font-semibold text-lg w-[30%]'>${subtotal}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
                ) : (
                    // <div className='flex justify-center items-center h-[350px]'>
                    //     <box-icon name='loader-circle' animation='spin' color='#C41111' size="70px"></box-icon>
                    // </div>
                    <div className='p-6 flex flex-col justify-center text-center items-center mt-10'>
                        <TbShoppingBagCheck className='text-8xl'/>
                       <p className='font-semibold text-xl my-4'>Empezá un carrito de compras!</p>
                       <Link to="/productos">
                       <button className="bg-rojo hover:bg-black rounded-sm py-2 px-4 text-lg text-white font-semibold w-[200px]">Descubrir productos</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

