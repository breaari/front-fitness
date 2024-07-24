import React, { useEffect } from "react";
import { Filtros } from "../../Components/Filtros/Filtros";
import { Ordenar } from "../../Components/Filtros/Ordenar";
import { Carrusel } from "../../Components/Carrusel/Carrusel";
import { Cards } from "../../Components/Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import { setProductos } from "../../Redux/Slice/Slice";
import axios from 'axios';
import { FiltrosMovil } from "../../Components/Filtros/filtrosMovil";

export const Productos = () => {

    const dispatch = useDispatch();
  const productos = useSelector((state) => state.fitness.productos);
  const categoriasSelected = useSelector((state) => state.fitness.categoriasSelected);
  const subcategoriasSelected = useSelector((state) => state.fitness.subcategoriasSelected);
  const query = useSelector((state) => state.fitness.query);


useEffect(() => {
    const fetchProductos = async () => {
        const queryParams = new URLSearchParams();

        if (query.trim() !== "") {
            queryParams.append('q', query);
        }

        
        let selectedIds = Array.isArray(categoriasSelected) ? categoriasSelected : [categoriasSelected];
        if (selectedIds.length > 0 && selectedIds[0] !== "") {
            selectedIds.forEach(id => queryParams.append('categoriaId', id));
        }

        if (subcategoriasSelected.length > 0) {
            subcategoriasSelected.forEach(id => queryParams.append('subcategoriaId', id));
        }

        const url = queryParams.toString()
            ? `/productos/search?${queryParams.toString()}`
            : `/productos`;

        try {
            const response = await axios.get(url);
            const data = response.data; // Accede directamente a response.data

            if (data.success) {
                dispatch(setProductos(data.productos));
            } else {
                dispatch(setProductos([]));
            }
        } catch (error) {
            console.error('Error fetching productos:', error);
            dispatch(setProductos([]));
        }
    };

    fetchProductos();
}, [categoriasSelected, subcategoriasSelected, query, dispatch]);
  

   
    return (
        <div className="flex flex-col">
            <Carrusel />
            <div className="mq980:hidden flex flex-row min-h-screen">
                <Filtros/>
                <div className="flex flex-col w-full">
                    <Ordenar />
                    <Cards />
                </div>
            </div>
            <div className="hidden mq980:block">
                <div className="flex flex-row items-center">
                <FiltrosMovil/>
                <Ordenar />
                </div>
            </div>
            <div className="hidden mq980:block">
            <Cards />
            </div>
        </div>
    );
};
