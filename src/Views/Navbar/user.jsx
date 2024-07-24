import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsCartCheck } from "react-icons/bs";

export const User = ({ setAccount }) => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        console.log("Usuario en localStorage:", storedUser);
        if (storedUser) {
            setUsuario(storedUser);
        }
    }, []);

    // Función para navegar a una ruta específica
    const goTo = (path) => {
        navigate(path);
        setAccount(false);
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('usuario');
        setUsuario(null);
        setAccount(false);
        navigate('/');
    };

    return (
        <div className='absolute right-20 top-20 z-30 bg-white p-6 shadow-md rounded-[2px] border-gray-200 border'>
            {usuario ? (
                <div className="flex flex-col">
                    <p className='text-black mb-2 flex justify-center'>Hola, {usuario.usuario}!</p>
                    {/* <div
                        onClick={() => goTo('/miscompras')} 
                        className='flex-row items-center bg-black hover:bg-green-600 mb-2 cursor-pointer text-white px-16 py-2 text-[14px] flex justify-center rounded-[2px]'
                        >
                        <BsCartCheck className="mr-2 text-[20px]"/>
                        Mis compras
                   </div> */}
                   <div
                    onClick={handleLogout}
                    className='items-center flex flex-row bg-black hover:bg-rojo cursor-pointer text-white px-16 py-2 text-[14px] justify-center rounded-[2px]'
                    >
                    <RiLogoutBoxRLine className="mr-2 text-[20px]"/>
                    Cerrar sesión
                    </div>
                </div>
            ) : (
                <>
                    <p onClick={() => goTo('/login')} className='bg-black hover:bg-rojo cursor-pointer text-white px-16 py-2 text-[14px] mb-2 flex justify-center rounded-[2px]'>Iniciá sesión</p>
                    <p onClick={() => goTo('/register')} className='bg-black hover:bg-rojo cursor-pointer text-white px-16 py-2 text-[14px] flex justify-center rounded-[2px]'>Registrate</p>
                </>
            )}
        </div>
    );
};
