import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategorias, setCategoriasSelected, setSubcategoriasSelected, toggleCategoriaSelected, setSubcategorias, toggleSubcategoriaSelected, setQuery } from "../../Redux/Slice/Slice"; // Ajustar las acciones según el slice
import { getCategorias } from "../Hooks/getCategorias";
import { getSubcategorias } from "../Hooks/getSubcategorias";

export const Filtros = () => {
    const dispatch = useDispatch();
    const categoriasSelected = useSelector((state) => state.fitness.categoriasSelected);
    const subcategoriasSelected = useSelector((state) => state.fitness.subcategoriasSelected);
    const categorias = useSelector((state) => state.fitness.categorias);
    const subcategorias = useSelector((state) => state.fitness.subcategorias);

    console.log("categoriasSelected filtro:", categoriasSelected)
    
    useEffect(() => {
        const fetchCategoria = async () => {
            const categoriaData = await getCategorias();
            dispatch(setCategorias(categoriaData));
        };
        fetchCategoria();
    }, [dispatch]);

    useEffect(() => {
        const fetchSubcategorias = async () => {
            // Verificar si categoriasSelected no es un array y convertirlo en un array con un solo elemento si es una cadena de texto
            let selectedIds = Array.isArray(categoriasSelected) ? categoriasSelected : [categoriasSelected];
    
            const subcategoriasData = await Promise.all(
                selectedIds.map(id => getSubcategorias(id))
            );
            const allSubcategorias = subcategoriasData.flat();
            dispatch(setSubcategorias(allSubcategorias)); // Actualizar todas las subcategorías
        };
    
        // Llama a fetchSubcategorias solo si hay categorías seleccionadas
        if (categoriasSelected && categoriasSelected.length > 0) {
            fetchSubcategorias();
        } else {
            // Si no hay categorías seleccionadas, limpia las subcategorías
            dispatch(setSubcategorias([]));
        }
    }, [categoriasSelected, dispatch]);
    

    const handleCategoriaChange = (id) => {
        dispatch(toggleCategoriaSelected(id)); // Alternar la selección de categorías
    };

    const handleSubcategoriaChange = (id) => {
        dispatch(toggleSubcategoriaSelected(id)); // Alternar la selección de subcategorías
    };

    const handleResetFilter = () => {
        dispatch(setSubcategoriasSelected([]));
        dispatch(setQuery(""));
        dispatch(setCategoriasSelected([]));
      };
    
    return (
        <div className="w-[250px] p-6 text-gris">
            <div className="flex flex-row justify-between items-center">
            <h1 className="font-semibold italic mb-2">FILTROS</h1>
            <p className="text-sm text-rojo hover:underline mb-2 cursor-pointer" onClick={handleResetFilter}>Limpiar filtros</p>
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
    );
};
