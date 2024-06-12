import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import logo from "../../assets/PV-1500PX.jpg"

export const Footer = () => {
    return  (
        <div className="bg-black flex flex-row justify-around px-12 py-4 items-center">
            <div className="overflow-hidden max-h-[150px] flex items-center">
               <img src={logo} className="h-[200px]"></img>  
            </div>
            <div className="flex flex-col justify-center text-white">
                <h1 className="font-semibold italic">SIGAMOS CONECTADOS</h1>
                <div className='flex flex-row justify-center mt-1'>
                <FaFacebook className="text-[30px] mr-2" />
                <FaInstagram className="text-[30px]"  />
                </div>
            </div>
        </div>
    )
}