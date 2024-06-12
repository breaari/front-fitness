import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProductos } from "../../Redux/Slice/Slice";
import { IoIosArrowDown } from "react-icons/io";

export const Ordenar = () => {
    const dispatch = useDispatch();
    const productos = useSelector((state) => state.fitness.productos);
    const [selectedOption, setSelectedOption] = useState("Más relevante");
    const [optionsVisible, setOptionsVisible] = useState(false);
    const sortedProductosRef = useRef([]);

    useEffect(() => {
        let sorted = [...productos];

        const getPrecio = (producto) => {
            return producto.preciopromo !== null && !isNaN(producto.preciopromo) ? parseFloat(producto.preciopromo) : parseFloat(producto.precioventa);
        };

        if (selectedOption === "Más relevante") {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (selectedOption === "Menor precio") {
            sorted.sort((a, b) => getPrecio(a) - getPrecio(b));
        } else if (selectedOption === "Mayor precio") {
            sorted.sort((a, b) => getPrecio(b) - getPrecio(a));
        }

        // Comparar con la versión anterior de la lista ordenada
        if (JSON.stringify(sortedProductosRef.current) !== JSON.stringify(sorted)) {
            sortedProductosRef.current = sorted; // Actualizar la referencia
            dispatch(setProductos(sorted)); // Enviar la lista ordenada al reducer
        }
    }, [productos, selectedOption, dispatch]);


    const handleSelectChange = (option) => {
        setSelectedOption(option);
        setOptionsVisible(false);
    };

    const toggleOptions = () => {
        setOptionsVisible(!optionsVisible);
    };

    const totalProductos = productos.length;

    return (
        <div className="flex flex-row w-full justify-between text-gris pt-6 px-4 text-[14px]">
            <div>{totalProductos} Productos</div>
            <div className="relative">
                <div onClick={toggleOptions} className="cursor-pointer flex flex-row items-center transition-transform duration-300 ease-in-out">
                    Ordenar por: {selectedOption} <IoIosArrowDown className={`transform ${optionsVisible ? 'rotate-180' : ''}`} />
                </div>
                {optionsVisible && (
                    <div className="z-50 absolute bg-white border border-gray-300 shadow-md mt-1 py-1 w-full">
                        <div onClick={() => handleSelectChange("Más relevante")} className="px-4 py-2 cursor-pointer hover:bg-gray-100">Más relevante</div>
                        <div onClick={() => handleSelectChange("Menor precio")} className="px-4 py-2 cursor-pointer hover:bg-gray-100">Menor precio</div>
                        <div onClick={() => handleSelectChange("Mayor precio")} className="px-4 py-2 cursor-pointer hover:bg-gray-100">Mayor precio</div>
                    </div>
                )}
            </div>
        </div>
    );
};
