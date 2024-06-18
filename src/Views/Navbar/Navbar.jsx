import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoCloseOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import logo from "../../assets/PV-1500PX.jpg"
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { setAllSubcategorias, setQuery, setCategoriasSelected, setSubcategoriasSelected, setCategorias } from "../../Redux/Slice/Slice";
import axios from 'axios'
import { getCategorias } from '../../Components/Hooks/getCategorias';
import { User } from './user';
import { Carrito } from './carrito';
import { Menumovil } from './menumovil';
import { BuscadorMovil } from './buscadormovil';

export const Navbar = () => {

     // Estado para el menú desplegable de productos
     const [showProducts, setShowProducts] = useState(false);
     const productContainerRef = useRef(null);
     const productTimeoutRef = useRef(null);
 
     // Función para manejar el evento onMouseEnter
     const handleMouseEnter = (setShowMenu, timeoutRef) => () => {
        clearTimeout(timeoutRef.current);
        setShowMenu(true);
    };
 
     // Función para manejar el evento onMouseLeave
     const handleMouseLeave = (setShowMenu, timeoutRef) => () => {
        timeoutRef.current = setTimeout(() => {
            setShowMenu(false);
        }, 500);
    };
    
    // Función para manejar el evento onMouseEnter de las categorías
    const handleCategoryMouseEnter = (timeoutRef) => () => {
        clearTimeout(timeoutRef.current);
    };

    // Función para manejar el evento onMouseLeave de las categorías
    const handleCategoryMouseLeave = (setShowMenu, timeoutRef) => () => {
        timeoutRef.current = setTimeout(() => {
            setShowMenu(false);
        }, 500);
    };

    const navigate = useNavigate()
    
    // Función para navegar a una ruta específica
    const goTo = (path) => {
        navigate(path);
        setShowProducts(false)
        setAccount(false)
    };

    const [account, setAccount]= useState(false)

    const handleAccountClick = ()=> {
        if (account) {
            setAccount(false)
        } else {
            setAccount(true)
        }
    }

    ///////////////////////////////////////
    const categorias = useSelector((state) => state.fitness.categorias);
    const allSubcategorias = useSelector((state) => state.fitness.allSubcategorias);
    const categoriasSelected = useSelector((state) => state.fitness.categoriasSelected);
    const subcategoriasSelected = useSelector((state) => state.fitness.subcategoriasSelected);
    const productos = useSelector((state) => state.fitness.productos);
    const [searchText, setSearchText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const dispatch = useDispatch();
    
    const handleSearchClick = () => {
        dispatch(setQuery(searchText)); // Actualiza el estado global de query
        navigate(`/productos`); // Navega a la página de productos
    };

    const handleClearClick = () => {
        setSearchText(''); // Limpia el campo de búsqueda
        dispatch(setQuery('')); // Actualiza el estado global de query a vacío
        setFilteredProducts([]);
        navigate(`/productos`); // Navega a la página de productos
    };

    useEffect(() => {
        if (categorias.length === 0) {
        const fetchCategoria = async () => {
            const categoriaData = await getCategorias();
            dispatch(setCategorias(categoriaData));
        };
        fetchCategoria();
    }
    }, [dispatch]);

    useEffect(() => {
        const fetchSubcategorias = async () => {
            try {
                const response = await axios.get('/subcategorias');
                const allSubcategoriasData = response.data.subcategorias;
                dispatch(setAllSubcategorias(allSubcategoriasData)); // Guarda los datos en allSubcategorias
            } catch (error) {
                console.error('Error fetching subcategorias:', error);
            }
        };

        fetchSubcategorias();
    }, [dispatch]);

       const handleCategoryClick = (categoriaId) => {
        dispatch(setCategoriasSelected([categoriaId]));
        dispatch(setSubcategoriasSelected([]));
        navigate('/productos');
        setShowProducts(false);
    };

    const handleSubcategoryClick = (categoriaId, subcategoriaId) => {
        dispatch(setCategoriasSelected([categoriaId]));
        dispatch(setSubcategoriasSelected([subcategoriaId]));
        navigate('/productos');
        setShowProducts(false);
    };

    useEffect(() => {
        if (searchText) {
            const filtered = productos.filter(producto =>
                producto.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [searchText, productos]);

    const handleClickProduct = (id) => {
        navigate(`/productos/${id}`)
        setFilteredProducts([]);
    }

    const calcularDescuento = (precioventa, preciopromo) => {
        if (isNaN(preciopromo) || preciopromo === null || preciopromo >= precioventa) {
            return null;
        }
        const descuento = ((precioventa - preciopromo) / precioventa) * 100;
        return Math.round(descuento); // Redondea el porcentaje al entero más cercano
    };

    return (
        <div>
        <div className='fixed top-0 w-full z-50'>
            <div className='flex justify-between flex-row items-center px-6 py-3 bg-black'>
                <div className='hidden mq980:block'>
                    <Menumovil></Menumovil>
                </div>
                <div  className="overflow-hidden max-h-[50px] flex items-center w-[10%] cursor-pointer mq980:w-auto" onClick={() => goTo('/')}>
                    <img src={logo} className=' h-[100px] mq980:h-[75px] mq980:w-full'></img>
                </div>
                <div className='flex flex-row justify-around py-3 text-white w-[50%] italic'>
                <Link to="/" className="mq980:hidden">INICIO</Link>

                <div 
                    ref={productContainerRef}
                    onMouseEnter={handleMouseEnter(setShowProducts, productTimeoutRef)}
                    onMouseLeave={handleMouseLeave(setShowProducts, productTimeoutRef)}
                >
              <Link 
                to="/productos"  
                onClick={() => {
                    setShowProducts(false);
                    dispatch(setQuery(""));
                    if (categoriasSelected.length || subcategoriasSelected.length) {
                        dispatch(setCategoriasSelected([]));
                        dispatch(setSubcategoriasSelected([]));
                    }
                }} 
                className={showProducts ? 'border-b-2 border-rojo mq980:hidden' : 'mq980:hidden'}
            >
                PRODUCTOS
            </Link>
                {showProducts && (
                    <div className="z-10 absolute bg-white mt-6 py-6 w-full left-0 shadow-md flex justify-center mq980:hidden"
                        onMouseEnter={handleCategoryMouseEnter(productTimeoutRef)}
                        onMouseLeave={handleCategoryMouseLeave(setShowProducts, productTimeoutRef)}>
                        {categorias.map((categoria) => (
                            <div key={categoria.id} className="flex flex-col mr-10">
                                <a className="text-black font-semibold hover:text-rojo cursor-pointer" onClick={() => handleCategoryClick(categoria.id)}>
                                    {categoria.nombre.toUpperCase()}
                                </a>
                                {allSubcategorias
                                    .filter(subcategoria => subcategoria.categoriaId === categoria.id)
                                    .map((subcategoria) => (
                                        <a key={subcategoria.id} className="text-gris font-regular mt-1 hover:text-black cursor-pointer" onClick={() => handleSubcategoryClick(subcategoria.categoriaId, subcategoria.id)}>
                                            {subcategoria.nombre}
                                        </a>
                                    ))}
                            </div>
                        ))}
                    </div>
                )}

                </div>
                
                <Link to="/preguntasfrecuentes" className='mq980:hidden'>PREGUNTAS FRECUENTES</Link>
                <Link to="/contacto" className='mq980:hidden'>CONTACTANOS</Link>
            </div>
                <div className='hidden mq980:block w-auto '>
                    <BuscadorMovil searchText={searchText} setSearchText={setSearchText} handleSearchClick={handleSearchClick} handleClearClick={handleClearClick} />
                </div>
                <div className='flex justify-center w-[20%] mq980:hidden'>
                    <label className=' border border-white rounded-[10px] py-2 px-4 w-[300px] flex flex-row justify-between bg-black'>
                        <input className=' focus:outline-none bg-black text-white border-bottom border-white'
                                 value={searchText}
                                 onChange={(e) => setSearchText(e.target.value)}
                                 onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                        ></input>
                        <div className="flex items-center">
                            {searchText && (
                                <button className='focus:outline-none' onClick={handleClearClick}>
                                    <IoCloseOutline className='text-[25px] text-white' />
                                </button>
                            )}
                                <button className='focus:outline-none' onClick={handleSearchClick}>
                                    <IoSearchOutline className='text-[25px] text-white' />
                                </button>
                        </div>
                    </label>
                </div>
                <div className='justify-center w-[10%] flex flex-row mq980:w-auto'>
                    <HiOutlineUser className='text-[30px] text-white mr-6 cursor-pointer' onClick={handleAccountClick}/>
                    <Carrito></Carrito>
                </div>
                { account && (
                    <User setAccount={setAccount}></User>
                )}
            </div>
            <div className='absolute right-[125px] shadow-md rounded-md mq980:hidden'>
                     {filteredProducts.map((producto) => {
                        const descuento = calcularDescuento(parseFloat(producto.precioventa), parseFloat(producto.preciopromo));
                        return (
                            
                            <div key={producto.id} className='right-0 border-b border-gray-200 p-2 cursor-pointer bg-white w-[360px] hover:bg-gray-100 flex' onClick={() => handleClickProduct(producto.id)}>
                                <img src={`https://back.paravosdistribuidora.com.ar/${producto.imagen.split(',')[0]}`} alt={producto.name} className='w-12 h-12 object-cover mr-4' />
                                <div>
                                    <div className='text-sm'>{producto.name}</div>
                                    {!isNaN(producto.preciopromo) && producto.preciopromo !== null ? (
                                        <div className='flex flex-row items-center'>
                                            <div className="flex flex-row">
                                                <p className="text-gris line-through text-sm">${producto.precioventa}</p>
                                                <p className="ml-1 font-semibold text-sm">${producto.preciopromo}</p>
                                            </div>
                                            <p className="text-green-700 text-sm ml-1">{descuento}% de descuento</p>
                                        </div>
                                    ) : (
                                        <p className="font-semibold text-sm">${producto.precioventa}</p>
                                    )}
                                </div>
                            </div>
                        
                        );

                    })}
                    </div>
        </div>
        </div>
    )
}