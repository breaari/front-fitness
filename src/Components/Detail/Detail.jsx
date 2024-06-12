import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import boxicons from 'boxicons'
import { AñadirAlCarrito } from './añadirAlCarrito';

export const Detail = () => {
    const { id } = useParams(); // Obtener el ID del producto de los parámetros de la URL
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`/productos/${id}`);
                setProducto(response.data.producto);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    if (error) return <div>Error: {error.message}</div>;

    const calcularDescuento = (precioventa, preciopromo) => {
        if (isNaN(preciopromo) || preciopromo === null || preciopromo >= precioventa) {
            return null;
        }
        const descuento = ((precioventa - preciopromo) / precioventa) * 100;
        return Math.round(descuento);
    };

    
    const descuento = producto ? calcularDescuento(producto.precioventa, producto.preciopromo) : null;
   
    return (
        <div className="mt-[74px] bg-white">
            {loading ? (
                <div className='flex justify-center items-center h-[350px]'>
                    <box-icon name='loader-circle' animation='spin' color='#C41111' size="70px"></box-icon>
                </div>
            ) : producto ? (
                <div className='flex flex-row'>
                    <div>
                        <img 
                            src={`https://back.paravosdistribuidora.com.ar/${producto.imagen.split(',')[0]}`} 
                            alt={producto.name} 
                            className="w-[400px] h-[400px] object-cover my-14 mx-20 shadow-md" 
                        />
                    </div>
                    <div className='mt-14 ml-20'>
                        <h1 className="font-bold text-4xl">{producto.name}</h1>
                        
                        {!isNaN(producto.preciopromo) && producto.preciopromo !== null ? (
                            <div className="text-2xl">
                                <div className="flex flex-row">
                                    <p className="text-gris line-through">${producto.precioventa}</p>
                                    <p className="ml-1 font-semibold">${producto.preciopromo}</p>
                                </div>
                                <p className="text-green-700">{descuento}% de descuento</p>
                            </div>
                        ) : (
                            <p className="font-semibold">${producto.precioventa}</p>
                        )}
    
                        {producto.descripcion && (
                            <p className='mt-4 text-xl'>{producto.descripcion}</p>
                        )}
    
                        {producto.variantes ? (
                            <div className="mt-4 flex flex-row">
                                {JSON.parse(producto.variantes).map((variante, index) => (
                                    <button 
                                        key={index} // Asegúrate de agregar una clave única para cada elemento mapeado
                                        className="mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                                        onClick={() => handleVarianteSelection(variante.value)}
                                    >
                                        {variante.label}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div></div>
                        )}
                         <div>
                        <AñadirAlCarrito></AñadirAlCarrito>
                        </div>
                    </div> 
                </div>
            ) : (
                <div>No se encontró el producto</div>
            )}
        </div>
    );
};    
