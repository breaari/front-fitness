import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

export const PagoExitoso = ({togglePagoExitoso}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extraer los parámetros de la URL
  const paymentId = queryParams.get('payment_id');
  const collectionId = queryParams.get('collection_id');
  const paymentType = queryParams.get('payment_type');
  const merchantOrderId = queryParams.get('merchant_order_id');
  // Aquí puedes extraer más parámetros si los necesitas

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white py-8 px-8 rounded-sm shadow-md w-[700px] text-black">
            <div className="flex flex-row justify-between">
                <h2 className="font-bold text-lg">Pago Exitoso</h2>
                <IoClose className="mb-6 cursor-pointer text-xl text-end" onClick={togglePagoExitoso} />
            </div>
            <div className="flex flex-col justify-center text-center">
                <p className="font-bold text-lg mb-1">¡Gracias por tu compra!</p>
                <p className="font-semibold">Podes hacer el seguimiento de tus compras desde acá:</p>
                <Link to="/miscompras">
                <button className='bg-rojo hover:bg-black font-semibold py-2 px-8 rounded-sm text-white mt-2'>Mis compras</button>
                </Link>
            </div>
      </div>
    </div>
  );
}
