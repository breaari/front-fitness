import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export const Whatsapp = () => {

    const [isHovered, setIsHovered] = useState(false);

    return (
            <a className={`fixed right-0 bottom-0 mr-8 mb-12 shadow-md cursor-pointer rounded-full bg-green-500 w-14 h-14 flex items-center justify-evenly overflow-hidden transition-all duration-300 ${isHovered ? "hover:w-auto px-6" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                href='https://api.whatsapp.com/send?phone=5491136002250'
                target="_blank"
                rel="noopener noreferrer"
            >
                {isHovered && (
                    <span className="hidden md:block text-white mr-2">Hablá con un asesor</span>
                )}
            <FaWhatsapp className="text-[30px] text-white" />
            </a>
            )
}