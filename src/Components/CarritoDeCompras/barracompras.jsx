import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

export const BarraCompras = ({ subtotal, productos }) => {
    const thresholds = [50000, 100000, 200000];
    const nextThreshold = thresholds.find(threshold => subtotal < threshold);
    const progressPercentage = nextThreshold ? (subtotal / nextThreshold) * 100 : 100;
    const amountRemaining = nextThreshold ? nextThreshold - subtotal : 0;
    const formattedAmountRemaining = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amountRemaining);

    let message;

    if (subtotal < 50000) {
        message = `Agregá ${formattedAmountRemaining} en productos para conseguir envío gratis dentro de Mar del Plata.`;
    } else if (subtotal >= 50000 && subtotal < 100000) {
        message = `¡Felicidades! Conseguiste envío gratis dentro de Mar del Plata. Agregá ${formattedAmountRemaining} para obtener un 5% de descuento en tu compra.`;
    } else if (subtotal >= 100000 && subtotal < 200000) {
        message = `¡Felicidades! Conseguiste envío gratis dentro de Mar del Plata y un 5% de descuento en tu compra. Agregá ${formattedAmountRemaining} para conseguir un 10% de descuento.`;
    } else {
        message = `¡Felicidades! Obtuviste un 10% de descuento y envío gratis dentro de Mar del Plata por tu compra.`;
    }

    return (
        <div className="mx-6 my-12">
            <div className="bg-gray-200 h-2 relative rounded-md">
                <div
                    className={`h-2 rounded-md relative ${!productos.length ? 'bg-gray-200' : 'bg-rojo'}`}
                    style={{ width: `${progressPercentage}%` }}
                >
                    <div
                        className={`w-4 h-4 rounded-full absolute ${!productos.length ? 'bg-gray-200' : 'bg-rojo'}`}
                        style={{ 
                            right: '-8px', 
                            top: '-4px',
                            transform: progressPercentage === 100 ? 'translateX(-50%)' : 'none'
                        }}
                    />
                </div>
            </div>
            <p className="text-start mt-4">
                {message}
            </p>
            <div>
                <Link to="/productos" >
                    <button className={`flex flex-row items-center hover:underline ${!productos.length ? 'text-gray-200' : 'text-rojo'}`}>
                        Continuar compra
                        <IoIosArrowForward />
                    </button>
                </Link>
            </div>
        </div>
    );
};


