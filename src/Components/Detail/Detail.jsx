import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import boxicons from 'boxicons'
import { AñadirAlCarrito } from './añadirAlCarrito';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export const Detail = () => {
    const { id } = useParams();
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

    const [images, setImages] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [mainImageIndex, setMainImageIndex] = useState(0);

    useEffect(() => {
        if (producto && producto.imagen) {
            setImages(producto.imagen.split(','));
        }
    }, [producto]);

    const mainImage = images.length > 0 ? images[0] : '';
    const visibleImages = images.slice(visibleIndex, visibleIndex + 4);

    const handleImageClick = (index) => {
        setMainImageIndex(index);
    };

   
    return (
        <div className="mt-[74px] bg-white min-h-screen mx-32 mq980:mx-0">
            {loading ? (
                <div className='flex justify-center items-center h-[350px]'>
                    <box-icon name='loader-circle' animation='spin' color='#C41111' size="70px"></box-icon>
                </div>
            ) : producto ? (
                <div className='flex flex-row mq980:flex-col mq980:justify-center mq980:mx-[5%]'>
                    <Link to="/productos">
                   <div className="absolute top-32 left-10 font-semibold italic mq980:hidden">VOLVER</div>
                   </Link>
                    {images.length === 1 && (
                        <div className=' w-[50%] mq980:w-full'>
                        <img
                            src={mainImage ? `https://back.paravosdistribuidora.com.ar/${mainImage}` : ""}
                            alt={producto.name}
                            className="w-[400px] h-[400px] mq980:w-full mq980:h-auto object-cover my-14 mx-20 rounded-md mq980:mx-0 mq980:my-4 mq980:w-[350px] mq980:h-[350px] border-gray-200 border"
                        />
                    </div>
                    )}


{images.length > 1 && ( 
                        <div className=' w-[50%] mq980:w-full'>
                        <div className='mq980:hidden flex flex-row justify-center '>
                            <div className="flex flex-col items-center my-14 mx-2 h-[400px] justify-start gap-2">
                                {visibleImages.map((image, index) => (
                                    <img
                                        key={index + visibleIndex}
                                        src={`https://back.paravosdistribuidora.com.ar/${image}`}
                                        alt={`Producto ${index + visibleIndex}`}
                                        className={`w-[90px] h-[90px] object-cover rounded-md cursor-pointer border-gray-200 border ${index === mainImageIndex ? 'border-red-500' : ''}`}
                                        onClick={() => handleImageClick(index + visibleIndex)}
                                    />
                                ))}
                            
                            </div>
                            <div>
                                <img
                                    src={images[mainImageIndex] ? `https://back.paravosdistribuidora.com.ar/${images[mainImageIndex]}` : ""}
                                    alt={producto.name}
                                    className="w-[400px] h-[400px] mq980:w-full mq980:h-auto object-cover my-14 rounded-md border-gray-200 border"
                                />
                            </div>
                        </div>

                        {/* <div className='hidden mq980:block'>
                        <div className='flex flex-col justify-center mq980:mx-[5%]'>
                            <div className='flex justify-center'>
                            <img
                                src={images[mainImageIndex] ? `https://back.paravosdistribuidora.com.ar/${images[mainImageIndex]}` : ""}
                                alt={producto.name}
                                className="mq980:w-full w-[400px] h-auto object-cover my-2 rounded-md flex justify-center border-gray-200 border"
                            />
                            </div>
                            <div className="flex flex-row items-center justify-start space-x-3">
                            {visibleImages.filter((image, index) => index + visibleIndex !== mainImageIndex).map((image, index) => (
                                <img
                                key={index + visibleIndex}
                                src={`https://back.paravosdistribuidora.com.ar/${image}`}
                                alt={`Producto ${index + visibleIndex}`}
                                className="w-[90px] h-[90px] object-cover cursor-pointer rounded-md border-gray-200 border"
                                onClick={() => handleImageClick(index + visibleIndex)}
                                />
                            ))}
                            </div>
                        </div>
                        </div> */}

<div className='hidden mq980:block'>
    <div className='flex flex-col justify-center mq980:mx-[5%]'>
        <div className='flex justify-center'>
            <img
                src={images[mainImageIndex] ? `https://back.paravosdistribuidora.com.ar/${images[mainImageIndex]}` : ""}
                alt={producto.name}
                className="mq980:w-full w-[400px] h-auto object-cover my-2 rounded-md flex justify-center border-gray-200 border"
            />
        </div>
        <div className="flex flex-row items-center justify-start space-x-3">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={`https://back.paravosdistribuidora.com.ar/${image}`}
                    alt={`Producto ${index}`}
                    className={`w-[90px] h-[90px] object-cover cursor-pointer rounded-md border-gray-200 border ${index === mainImageIndex ? 'border-red-500' : ''}`}
                    onClick={() => handleImageClick(index)}
                />
            ))}
        </div>
    </div>
</div>


                        </div>
                    )}



                    <div className='mt-14 mq980:mt-0 mq980:ml-0 mq980:p-4 w-[50%] mq980:w-full'>
                        <h1 className="font-bold text-4xl mq980:text-2xl">{producto.name}</h1>
                        
                        {!isNaN(producto.preciopromo) && producto.preciopromo !== null ? (
                            <div className="text-2xl">
                                <div className="flex flex-row">
                                    <p className="text-gris line-through">${producto.precioventa}</p>
                                    <p className="ml-1 font-semibold">${producto.preciopromo}</p>
                                </div>
                                <p className="text-green-700">{descuento}% de descuento</p>
                            </div>
                        ) : (
                            <p className="font-semibold text-2xl">${producto.precioventa}</p>
                        )}
    
                        {producto.descripcion && (
                            <p className='mt-4 text-xl'>{producto.descripcion !=="null" ? producto.descripcion : ""}</p>
                        )}
    
                        { producto.variantes && producto.variantes !== "null" ? (
                            <div className="mt-4 flex flex-row">
                                { JSON.parse(producto.variantes).map((variante, index) => (
                                    <button 
                                        key={index}
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

