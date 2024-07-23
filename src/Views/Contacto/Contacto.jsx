// import React from "react";
// import { FiClock } from "react-icons/fi";
// import { FaWhatsapp } from "react-icons/fa";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import contacto from '../../assets/contacto.png'

// export const Contacto = () => {
//     return (
//         <div className="flex flex-row">
//             <div className="w-auto h-screen">
//                 <img src={contacto} className="w-full h-full objet-cover"/>
//             </div>
//         <div className="flex flex-col justify-center min-h-screen text-center items-center aling-center">
//             <h1 className=" font-bold italic text-3xl flex justify-center mb-3 mt-2">CONTACTO</h1>
//                 <div className="flex flex-row items-center justify-center my-2">
//                     <FiClock className="text-[20px] mb-[2px] mr-2"/>
//                     <p className="text-xl font-bold">HORARIO DE ATENCIÓN</p>
//                 </div>
//                 <div className="flex flex-col justify-center">
//                     <p className="flex justify-center"> Lunes a Viernes 9hs a 18hs </p>
//                     <p className="flex justify-center">Sábados 9hs a 14.30hs</p>
//                 </div>
//                 <div className="flex flex-row items-center justify-center my-2">
//                     <FaWhatsapp className="text-[20px] mb-[2px] mr-2"/>
//                     <p className="text-xl font-bold ">WHATSAPP</p>
//                 </div>
//                     <p className="flex justify-center hover:underline cursor-pointer" href='https://api.whatsapp.com/send?phone=5492233497643'
//                     target="_blank" rel="noopener noreferrer">+ 54 9 223 349-7643</p>
//                 <div className="flex flex-row items-center justify-center my-2">
//                     <HiOutlineLocationMarker className="text-[20px] mb-[2px] mr-2"/>
//                     <p className="text-xl font-bold  ">DIRECCIÓN</p>
//                 </div>
//                     <p className="flex justify-center hover:underline cursor-pointer" href='https://maps.app.goo.gl/K6E4i9XdXzmRY2nG6'
//                     target="_blank" rel="noopener noreferrer">Sarmiento 2883, Mar del Plata, Buenos Aires.</p>
//         </div>
//         </div>
//     )
// }

import { FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import contacto from '../../assets/contacto.png'

export const Contacto = () => {
  return (
    <div className="flex h-screen">
      <div className="mq980:hidden w-auto h-full">
        <img src={contacto} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-center min-h-screen text-center items-center flex-1">
        <h1 className="font-bold italic text-3xl mb-3 mt-2">CONTACTO</h1>
        <div className="flex flex-row items-center justify-center my-2">
          <FiClock className="text-[20px] mb-[2px] mr-2" />
          <p className="text-xl font-bold">HORARIO DE ATENCIÓN</p>
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex justify-center">Lunes a Viernes 9hs a 18hs</p>
          <p className="flex justify-center">Sábados 9hs a 14.30hs</p>
        </div>
        <div className="flex flex-row items-center justify-center my-2">
          <FaWhatsapp className="text-[20px] mb-[2px] mr-2" />
          <p className="text-xl font-bold">WHATSAPP</p>
        </div>
        <a
          className="flex justify-center hover:underline cursor-pointer"
          href="https://api.whatsapp.com/send?phone=5492233497643"
          target="_blank"
          rel="noopener noreferrer"
        >
          + 54 9 223 349-7643
        </a>
        <div className="flex flex-row items-center justify-center my-2">
          <HiOutlineLocationMarker className="text-[20px] mb-[2px] mr-2" />
          <p className="text-xl font-bold">DIRECCIÓN</p>
        </div>
        <a
          className="flex justify-center hover:underline cursor-pointer"
          href="https://maps.app.goo.gl/K6E4i9XdXzmRY2nG6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sarmiento 2883, Mar del Plata, Buenos Aires.
        </a>
      </div>
    </div>
  );
};
