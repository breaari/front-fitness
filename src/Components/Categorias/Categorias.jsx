import React from "react";
import deportes from "../../assets/DEPORTES.png"
import discosybarras from "../../assets/DISCOSYBARRAS.png"
import funcional from "../../assets/FUNCIONAL.png"
import pesolibre from "../../assets/PESOLIBRE.png"
import { useNavigate } from "react-router-dom";
import { setCategoriasSelected } from "../../Redux/Slice/Slice";
import { useDispatch, useSelector } from "react-redux";


export const Categorias = () => {

    const categoriasSelected = useSelector((state) => state.fitness.categoriasSelected);
console.log("categoriasSElected:", categoriasSelected)

    const navigate = useNavigate()
    
    // Función para navegar a una ruta específica
    const goTo = (path) => {
        navigate(path);
    };

    const dispatch = useDispatch()

    const handleClick = (categoriaId) => {
        dispatch(setCategoriasSelected([categoriaId]))
        goTo("/productos")
    };

    return (
        <div className="flex flex-wrap w-full py-4 bg-white">
            <div className="w-[25%] h-auto flex justify-center items-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => handleClick("d72aaf7a-f9ce-402e-b150-6e8d92df7786")}>
                <img src={pesolibre}></img>
            </div>
            <div className=" w-[25%] h-auto flex justify-center items-center hover:scale-105 transition-transform duration-300 cursor-pointer"
             onClick={() => handleClick("1224f942-e44a-47c2-9f05-430b3389b68d")}>
                <img src={discosybarras}></img>
            </div>
            <div className=" w-[25%] h-auto flex justify-center items-center hover:scale-105 transition-transform duration-300 cursor-pointer"
             onClick={() => handleClick("721ba2c1-2725-4c8a-b55f-d60313653f08")}>
               <img src={funcional}></img>
            </div>
            <div className="w-[25%] h-auto flex justify-center items-center hover:scale-105 transition-transform duration-300 cursor-pointer"
             onClick={() => handleClick("00ecfa47-3cab-4198-8dc5-b92803d6fde2")}>
                <img src={deportes}></img>
            </div>
        </div>
        
    )
}