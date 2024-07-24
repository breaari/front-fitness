// import React from 'react';
// import { IoIosArrowForward } from "react-icons/io";
// import { Link } from 'react-router-dom';

// export const BarraCompras = ({ subtotal }) => {
//     const thresholds = [50000, 100000, 200000];
//     const nextThreshold = thresholds.find(threshold => subtotal < threshold);
//     const progressPercentage = nextThreshold ? (subtotal / nextThreshold) * 100 : 100;
//     const amountRemaining = nextThreshold ? nextThreshold - subtotal : 0;
//     const formattedAmountRemaining = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amountRemaining);

//     return (
//         <div className="mx-6 my-12">
//             <div className="bg-gray-200 h-2 relative rounded-md">
//                 <div
//                     className="bg-rojo h-2 rounded-md relative"
//                     style={{ width: `${progressPercentage}%` }}
//                 >
//                     <div
//                         className="w-4 h-4 bg-rojo rounded-full absolute"
//                         style={{ 
//                             right: '-8px', 
//                             top: '-4px',
//                             transform: progressPercentage === 100 ? 'translateX(-50%)' : 'none'
//                         }}
//                     />
//                 </div>
//             </div>
//             {nextThreshold && (
//                 <p className="text-start mt-4">
//                     Agregá {formattedAmountRemaining} en productos para conseguir envío gratis dentro de Mar del Plata.
//                 </p>
//             )}
//             {!nextThreshold && (
//                 <p className="text-center mt-2">
//                     ¡Felicidades! Has alcanzado el umbral máximo de envío gratis.
//                 </p>
//             )}
//             <div>
//             <Link to="/productos">
//                 <button className="text-rojo flex flex-row items-center hover:underline">
//                     Continuar compra
//                     <IoIosArrowForward />
//             </button>
//             </Link>
//             </div>
//         </div>
//     );
// };

import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

export const BarraCompras = ({ subtotal }) => {
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
                    className="bg-rojo h-2 rounded-md relative"
                    style={{ width: `${progressPercentage}%` }}
                >
                    <div
                        className="w-4 h-4 bg-rojo rounded-full absolute"
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
                <Link to="/productos">
                    <button className="text-rojo flex flex-row items-center hover:underline">
                        Continuar compra
                        <IoIosArrowForward />
                    </button>
                </Link>
            </div>
        </div>
    );
};


