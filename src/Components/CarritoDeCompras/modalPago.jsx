import React from "react";
import { IoClose } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

export const ModalPago = ({ toggleModalPago, idpedido}) => {

    const whatsappNumber = '5492233497643';
    const message = `Hola! Me contacto para acordar pago y envío del pedido #${idpedido}`;
    const encodedMessage = encodeURIComponent(message);
    
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white py-8 px-8 rounded-sm shadow-md w-[700px]">
                <div className="flex flex-row justify-end text-black"> 
                    <IoClose className="mb-6 cursor-pointer text-xl text-end" onClick={toggleModalPago} />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="font-bold italic text-center text-black text-2xl">GRACIAS POR TU COMPRA!</p>
                    <p className="font-bold italic text-center text-black my-2 text-xl">PEDIDO #{idpedido}</p>
                    <p className="italic text-center text-black my-2 text-xl">Para finalizar tu compra y coordinar el envío, por favor, contáctanos a través de WhatsApp.</p>
                    <a href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`} 
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="flex items-center justify-center bg-green-500 hover:bg-green-700 rounded-md text-white font-semibold text-xl py-3 px-6 w-auto my-2">
                        <FaWhatsapp className="text-[30px] text-white mr-2" />
                        <p className="text-center">223 349-7643</p>
                    </a>
                </div>
            </div>
        </div>
    );
};
