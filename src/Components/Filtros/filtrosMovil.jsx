import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategorias, setCategoriasSelected, setSubcategoriasSelected, toggleCategoriaSelected, setSubcategorias, toggleSubcategoriaSelected, setQuery } from "../../Redux/Slice/Slice"; // Ajustar las acciones según el slice
import { getCategorias } from "../Hooks/getCategorias";
import { getSubcategorias } from "../Hooks/getSubcategorias";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

export const FiltrosMovil = () => {
    const dispatch = useDispatch();
    const categoriasSelected = useSelector((state) => state.fitness.categoriasSelected);
    const subcategoriasSelected = useSelector((state) => state.fitness.subcategoriasSelected);
    const categorias = useSelector((state) => state.fitness.categorias);
    const subcategorias = useSelector((state) => state.fitness.subcategorias);
    
    useEffect(() => {
        const fetchCategoria = async () => {
            const categoriaData = await getCategorias();
            dispatch(setCategorias(categoriaData));
        };
        fetchCategoria();
    }, [dispatch]);

    useEffect(() => {
        const fetchSubcategorias = async () => {
            let selectedIds = Array.isArray(categoriasSelected) ? categoriasSelected : [categoriasSelected];
    
            const subcategoriasData = await Promise.all(
                selectedIds.map(id => getSubcategorias(id))
            );
            const allSubcategorias = subcategoriasData.flat();
            dispatch(setSubcategorias(allSubcategorias));
        };
    
        if (categoriasSelected && categoriasSelected.length > 0) {
            fetchSubcategorias();
        } else {
            dispatch(setSubcategorias([]));
        }
    }, [categoriasSelected, dispatch]);
    

    const handleCategoriaChange = (id) => {
        dispatch(toggleCategoriaSelected(id));
    };

    const handleSubcategoriaChange = (id) => {
        dispatch(toggleSubcategoriaSelected(id));
    };

    const handleResetFilter = () => {
        dispatch(setSubcategoriasSelected([]));
        dispatch(setQuery(""));
        dispatch(setCategoriasSelected([]));
      };

    const [activeFilter, setActiveFilter] = useState(false)

    const toggleFilter = () => {
        setActiveFilter(!activeFilter)
    }
    
    return (
        <div className=" text-gris">
            <HiOutlineAdjustmentsHorizontal className="text-[30px] mt-6 mx-1" onClick={toggleFilter}/>
            {activeFilter && (
                <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50 flex flex-col">
                    <div className="bg-white p-6">
                    <IoClose className="text-[30px] mt-2 mx-1 mb-4" onClick={toggleFilter}/>
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="font-semibold italic mb-2">FILTROS</h1>
                        <p className="text-sm text-rojo hover:underline mb-2 cursor-pointer" onClick={handleResetFilter}>
                            Limpiar filtros
                        </p>
                    </div>
                    <div className="bg-gray-200 shadow-md h-[1px] w-full"></div>
                    
                    <h2 className="font-semibold mt-2">Categorias</h2>
                    <div className="py-2">
                        {categorias.map((categoria) => (
                            <label key={categoria.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={categoriasSelected.includes(categoria.id)}
                                    onChange={() => handleCategoriaChange(categoria.id)}
                                    className="mr-1"
                                />
                                {categoria.nombre}
                            </label>
                        ))}
                    </div>
                    
                    <div className="bg-gray-200 shadow-md h-[1px] w-full"></div>
                    
                    <h2 className="font-semibold mt-2">Subcategorias</h2>
                    <div className="py-2">
                        {subcategorias.map((subcategoria) => (
                            <label key={subcategoria.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={subcategoriasSelected.includes(subcategoria.id)}
                                    onChange={() => handleSubcategoriaChange(subcategoria.id)}
                                    className="mr-1"
                                />
                                {subcategoria.nombre}
                            </label>
                        ))}
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};