import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

export const Card = ({producto}) => {
    const [categoria, setCategoria] = useState("")
    const [subcategoria, setSubcategoria] = useState("")
    
    useEffect(() => {
        const fetchCategoria = async () => {
            const categoriaData = await axios(`/categorias/${producto.categoriaId}`);
            const categoriaNombre = categoriaData.data.categoria.nombre
            setCategoria(categoriaNombre);
        };
        const fetchSubcategoria = async () => {
            const subcategoriaData = await axios(`/subcategorias/${producto.subcategoriaId}`);
            const subcategoriaNombre = subcategoriaData.data.nombre
            setSubcategoria(subcategoriaNombre);
        };
        fetchSubcategoria()
        fetchCategoria();
    }, []);

    const calcularDescuento = (precioventa, preciopromo) => {
        if (isNaN(preciopromo) || preciopromo === null || preciopromo >= precioventa) {
            return null;
        }
        const descuento = ((precioventa - preciopromo) / precioventa) * 100;
        return Math.round(descuento); 
    };
    
    const descuento = calcularDescuento(producto.precioventa, producto.preciopromo);
    
    return (
        <Link to={`/productos/${producto.id}`}>
        <div className="flex flex-col">
        <div className=" w-[225px] h-auto flex-1 mq980:w-[140px] mq980:h-auto text-start transform transition-transform hover:scale-105">
        <img 
            src={producto.imagen ? `https://back.paravosdistribuidora.com.ar/${producto.imagen.split(',')[0]}` :  ""} 
            alt={producto.name} 
            className="w-[225px] h-[225px] object-cover mq980:w-full mq980:h-auto"
        />
        <p className="font-semibold mt-2">{producto.name}</p>
        <p className="text-gray-500 text-sm">{categoria} - {subcategoria}</p>
        {!isNaN(producto.preciopromo) && producto.preciopromo !== null ? (
            <div>
           <div className="flex flex-row">
            <p className="text-gris line-through">${producto.precioventa}</p>
            <p className="ml-1 font-semibold">${producto.preciopromo}</p>
            </div>
            <p className="text-green-700 text-sm">{descuento}% de descuento</p>
            </div>
        ) : (
            <p className="font-semibold">${producto.precioventa}</p>
        )}
    </div>
    </div>
    </Link>
    )
}