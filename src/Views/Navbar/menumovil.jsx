import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoriasSelected, setSubcategoriasSelected } from '../../Redux/Slice/Slice'; 
import { IoMenu, IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

export const Menumovil = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [activeCategory, setActiveCategory] = useState([]);
    const categorias = useSelector((state) => state.fitness.categorias);
    const allSubcategorias = useSelector((state) => state.fitness.allSubcategorias);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const goTo = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    const handleCategoryClick = (categoriaId) => {
        
        if (activeCategory.includes(categoriaId)) {
            setActiveCategory(activeCategory.filter(id => id !== categoriaId));
        } else {
            setActiveCategory([...activeCategory, categoriaId]);
        }
    };

    const handleSubcategoryClick = (categoriaId, subcategoriaId) => {
        dispatch(setCategoriasSelected([categoriaId]));
        dispatch(setSubcategoriasSelected([subcategoriaId]));
        setIsOpen(false);
        goTo('/productos');
    };

    const handleCategoriaClick = (categoriaId) => {
        dispatch(setCategoriasSelected([categoriaId]));
        dispatch(setSubcategoriasSelected([]));
        setIsOpen(false);
        goTo('/productos');
    };

    return (
        <div>
            <button onClick={toggleMenu} className="text-white focus:outline-none">
                <IoMenu className="text-[30px]"/>
            </button>
            {isOpen && (
                <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50 flex flex-col">
                    <div className="bg-black rounded-sm shadow-md w-[60%] min-h-screen p-6">
                        <button onClick={toggleMenu} className="mb-5">
                            <IoMenu className="text-[30px] text-white"/>
                        </button>
                        <Link to="/" onClick={toggleMenu} className="block mb-3 text-white italic">INICIO</Link>
                        <div className="mb-3 text-white cursor-pointer">
                            <div className='flex flex-row justify-between items-center'>
                                <button className='italic' onClick={() => goTo('/productos')}>PRODUCTOS</button>
                                <IoIosArrowDown onClick={() => setShowCategories(!showCategories)} />
                            </div>
                            {showCategories && (
                                <div className="pl-4 mt-2 ">
                                    {categorias.map((categoria) => (
                                        <div key={categoria.id} className="mb-2">
                                            <div className='flex flex-row justify-between'>
                                            <a  className="block cursor-pointer"  onClick={() => handleCategoriaClick(categoria.id)}>
                                                {categoria.nombre.toUpperCase()}
                                            </a>
                                            <IoIosArrowDown onClick={() => handleCategoryClick(categoria.id)} />
                                            </div>
                                            {activeCategory.includes(categoria.id) && (
                                                <div className="pl-4 mt-2">
                                                    {allSubcategorias
                                                        .filter(subcategoria => subcategoria.categoriaId === categoria.id)
                                                        .map((subcategoria) => (
                                                            <a 
                                                                key={subcategoria.id} 
                                                                onClick={() => handleSubcategoryClick(categoria.id, subcategoria.id)} 
                                                                className="block cursor-pointer pl-4 text-gray-600"
                                                            >
                                                                {subcategoria.nombre}
                                                            </a>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link to="/preguntasfrecuentes" onClick={toggleMenu} className="block mb-3 text-white italic">PREGUNTAS FRECUENTES</Link>
                        <Link to="/contacto" onClick={toggleMenu} className="block text-white italic">CONTACTANOS</Link>
                    </div>
                </div>
            )}
        </div>
    );
};
