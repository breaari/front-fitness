import React from "react";
import { FiClock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

export const Contacto = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen">
            <h1 className=" font-bold italic text-3xl flex justify-center mb-3 mt-2">CONTACTO</h1>
                <div className="flex flex-row items-center justify-center my-2">
                    <FiClock className="text-[20px] mb-[2px] mr-2"/>
                    <p className="text-xl font-bold">HORARIO DE ATENCIÓN</p>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="flex justify-center"> Lunes a Viernes 9hs a 18hs </p>
                    <p className="flex justify-center">Sábados 9hs a 14.30hs</p>
                </div>
                <div className="flex flex-row items-center justify-center my-2">
                    <FaWhatsapp className="text-[20px] mb-[2px] mr-2"/>
                    <p className="text-xl font-bold ">WHATSAPP</p>
                </div>
                    <p className="flex justify-center hover:underline cursor-pointer" href='https://api.whatsapp.com/send?phone=5491136002250'
                    target="_blank" rel="noopener noreferrer">+ 54 9 11 3600-2250</p>
                <div className="flex flex-row items-center justify-center my-2">
                    <HiOutlineLocationMarker className="text-[20px] mb-[2px] mr-2"/>
                    <p className="text-xl font-bold  ">DIRECCIÓN</p>
                </div>
                    <p className="flex justify-center hover:underline cursor-pointer" href='https://maps.app.goo.gl/k8txXabneW5CHu2SA'
                    target="_blank" rel="noopener noreferrer">Deán Funes 1729, Mar del Plata, Buenos Aires.</p>
        </div>
    )
}