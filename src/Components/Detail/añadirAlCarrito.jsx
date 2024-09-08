// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios'
// import { ToastContainer, Zoom, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { IoCloseOutline } from "react-icons/io5";

// export const AñadirAlCarrito = () => {
//     const [contador, setContador] = useState(1);
//     const storedUser = JSON.parse(localStorage.getItem('usuario')) ? JSON.parse(localStorage.getItem('usuario')) : "" ;
//     const userId = storedUser.id ? storedUser.id : "";// Obtener userId desde localStorage
//     const storedCarrito = JSON.parse(localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : "" ;
//     const carritoId = storedCarrito.id ? storedCarrito.id : "";// Obtener userId desde localStorage
//     const productId = useParams().id; // Asegúrate de obtener el productoId de tu contexto o props
//     const [noUsuario, setNoUsuario] = useState(false)

//     const incrementar = () => {
//         setContador(contador + 1);
//     };

//     const decrementar = () => {
//         if (contador > 1) {
//             setContador(contador - 1);
//         }
//     };

//     const input = {
//         carritoId: carritoId,
//         productId: productId,
//         cantidad: contador,
//         estado: "pendiente"
//     }

//     const fetchCarritoActualizado = async () => {
//         try {
//             const response = await axios.get(`/carrito/${carritoId}`);
//             if (response.data.success) {
//                 localStorage.setItem('carrito', JSON.stringify(response.data.carrito));
//             } else {
//                 if (!toast.isActive('error-toast')) {
//                     toast.error('Error al obtener el carrito actualizado.', {
//                         toastId: 'error-toast',
//                     });
//                 }
//             }
//         } catch (error) {
//             if (!toast.isActive('error-toast')) {
//                 toast.error('Error al obtener el carrito actualizado. Por favor, inténtelo de nuevo más tarde.', {
//                     toastId: 'error-toast',
//                 });
//             }
//         }
//     };

    
//     // const añadirAlCarrito = async () => {
//     //     if (!userId) {
//     //         setNoUsuario(true);
//     //         return; 
//     //     }

//     //     try {
//     //         const response = await axios.put('/carrito', input, {
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //               },
//     //         });
            
//     //         if (response.data.success) {
//     //             await fetchCarritoActualizado();
                
//     //             toast.success(`Añadido al carrito: ${contador} artículo(s)`, {
//     //                 toastId: 'delete-success-toast',
//     //             });
//     //         } else {
//     //             if (!toast.isActive('error-toast')) {
//     //                 toast.error('Error al añadir al carrito.', {
//     //                   toastId: 'error-toast', 
//     //                 });
//     //             }
//     //         }
//     //     } catch (error) {
//     //         if (!toast.isActive('error-toast')) {
//     //             toast.error('Error al añadir al carrito. Por favor, inténtelo de nuevo más tarde.', {
//     //               toastId: 'error-toast', 
//     //             });
//     //         }
//     //     }
//     // };

//     // const añadirAlCarrito = async () => {
//     //     if (!userId) {
//     //         // Si no hay usuario, guardar el carrito en localStorage
//     //         const carritoLocal = localStorage.getItem('carritoLocal') ? JSON.parse(localStorage.getItem('carritoLocal')) : [];
            
//     //         const nuevoProducto = {
//     //             productId: productId,
//     //             cantidad: contador,
//     //         };
    
//     //         // Verificar si el producto ya está en el carrito
//     //         const index = carritoLocal.findIndex(item => item.productId === productId);
//     //         if (index >= 0) {
//     //             carritoLocal[index].cantidad += contador; // Si ya existe, aumentar la cantidad
//     //         } else {
//     //             carritoLocal.push(nuevoProducto); // Si no, agregar el nuevo producto
//     //         }
    
//     //         // Guardar el carrito actualizado en localStorage
//     //         localStorage.setItem('carritoLocal', JSON.stringify(carritoLocal));
            
//     //         toast.success(`Añadido al carrito local: ${contador} artículo(s)`, {
//     //             toastId: 'local-carrito-toast',
//     //         });
//     //         return;
//     //     }
    
//     //     // Si el usuario está autenticado, se procede con el flujo normal
//     //     try {
//     //         const response = await axios.put('/carrito', input, {
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //               },
//     //         });
            
//     //         if (response.data.success) {
//     //             await fetchCarritoActualizado();
                
//     //             toast.success(`Añadido al carrito: ${contador} artículo(s)`, {
//     //                 toastId: 'delete-success-toast',
//     //             });
//     //         } else {
//     //             if (!toast.isActive('error-toast')) {
//     //                 toast.error('Error al añadir al carrito.', {
//     //                   toastId: 'error-toast', 
//     //                 });
//     //             }
//     //         }
//     //     } catch (error) {
//     //         if (!toast.isActive('error-toast')) {
//     //             toast.error('Error al añadir al carrito. Por favor, inténtelo de nuevo más tarde.', {
//     //               toastId: 'error-toast', 
//     //             });
//     //         }
//     //     }
//     // };

//     // const añadirAlCarrito = async () => {
//     //     if (!userId) {
//     //         // Si no hay usuario, obtener o crear el carrito local
//     //         const carritoLocal = localStorage.getItem('carritoLocal') ? JSON.parse(localStorage.getItem('carritoLocal')) : { productos: [] };
    
//     //         const nuevoProducto = {
//     //             productId: productId,
//     //             cantidad: contador,
//     //         };
    
//     //         // Verificar si el producto ya está en el carrito
//     //         const index = carritoLocal.findIndex(item => item.productId === productId);
//     //         if (index >= 0) {
//     //             carritoLocal[index].cantidad += contador; // Si ya existe, aumentar la cantidad
//     //         } else {
//     //             carritoLocal.push(nuevoProducto); // Si no, agregar el nuevo producto
//     //         }
    
//     //         // Guardar el carrito actualizado en localStorage
//     //         localStorage.setItem('carritoLocal', JSON.stringify(carritoLocal));
    
//     //         toast.success(`Añadido al carrito local: ${contador} artículo(s)`, {
//     //             toastId: 'local-carrito-toast',
//     //         });
//     //         return;
//     //     }
//     // };
    
//     const añadirAlCarrito = async () => {
//         if (!userId) {
//             // Obtener o crear el carrito local con la estructura correcta
//             const carritoLocal = localStorage.getItem('carritoLocal')
//                 ? JSON.parse(localStorage.getItem('carritoLocal'))
//                 : { productos: [] };
    
//             // Crear el nuevo producto
//             const nuevoProducto = {
//                 cantidad: contador,
//                 productId: productId,
//             };
//             console.log("carritito local:", carritoLocal)
//             // Verificar si el producto ya está en el carrito
//             const index = carritoLocal.productos.findIndex(item => item.productId === productId);
//             if (index >= 0) {
//                 // Si ya existe, aumentar la cantidad
//                 carritoLocal.productos[index].cantidad += contador;
//             } else {
//                 // Si no, agregar el nuevo producto
//                 carritoLocal.productos.push(nuevoProducto);
//             }
    
//             // Guardar el carrito actualizado en localStorage
//             localStorage.setItem('carritoLocal', JSON.stringify(carritoLocal));
    
//             // Mostrar mensaje de éxito
//             toast.success(`Añadido al carrito local: ${contador} artículo(s)`, {
//                 toastId: 'local-carrito-toast',
//             });
    
//             // Opcional: si necesitas hacer algo con la cantidad total de productos, puedes acceder a la longitud de carritoLocal.productos
//             console.log("Número total de productos en el carrito local:", carritoLocal.productos.length);
            
//             return;
//         }
//     };

    
//     return (
//         <div className="flex flex-row items-center mt-12">

//             {/* {noUsuario && (
//                 <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 shadow-md">
//                     <div className="bg-white p-8 rounded-sm shadow-lg relative">
//                         <button 
//                             className="absolute top-0 right-0 mt-2 mr-2"
//                             onClick={() => setNoUsuario(false)} // Establecer noUsuario a false al hacer clic
//                         >
//                             <IoCloseOutline className='text-[25px] text-gray-800 hover:text-gray-500' />
//                         </button>
//                         <p className="text-lg mb-4 font-semibold">Para agregar productos a tu carrito es necesario que inicies sesión.</p>
//                         <div className="flex justify-center">
//                             <Link to="/login">
//                                 <button 
//                                     className="text-sm py-2 bg-rojo text-white rounded-sm hover:bg-black focus:outline-none mr-4 w-[175px]"
//                                     onClick={() => setNoUsuario(false)} // Establecer noUsuario a false al hacer clic
//                                 >
//                                     Iniciá sesión
//                                 </button>
//                             </Link>
//                             <Link to="/register">
//                             <button 
//                                 className="text-sm py-2 bg-rojo text-white rounded-sm hover:bg-black focus:outline-none w-[175px]"
//                                 onClick={() => setNoUsuario(false)} // Establecer noUsuario a false al hacer clic
//                             >
//                                 Registrate
//                             </button>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             )} */}

//             <div className="flex flex-row items-center mr-2">
//                 <button 
//                     className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none mr-2"
//                     onClick={decrementar}
//                 >
//                     -
//                 </button>
//                 <span className="text-xl font-semibold">{contador}</span>
//                 <button 
//                     className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none ml-2"
//                     onClick={incrementar}
//                 >
//                     +
//                 </button>
//             </div>
//             <button 
//                 className="px-4 py-2 bg-rojo text-white rounded-md hover:bg-red-800 focus:outline-none"
//                 onClick={añadirAlCarrito}
//             >
//                 Añadir al carrito
//             </button>
//             <ToastContainer
//                   position="top-right"
//                   autoClose={5000}
//                   hideProgressBar={false}
//                   newestOnTop={false}
//                   closeOnClick
//                   rtl={false}
//                   pauseOnFocusLoss
//                   draggable
//                   pauseOnHover
//                   limit={1}
//                   queue={false}
//                   theme="colored"
//                   transition={Zoom}
//                 />
//         </div>
//     );
// };


import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoCloseOutline } from "react-icons/io5";

export const AñadirAlCarrito = () => {
    const [contador, setContador] = useState(1);
    const storedUser = JSON.parse(localStorage.getItem('usuario')) || {};
    const userId = storedUser.id || ""; // Obtener userId desde localStorage
    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || {};
    const carritoId = storedCarrito.id || ""; // Obtener carritoId desde localStorage
    const productId = useParams().id; // Obtener el productoId desde los parámetros
    const [noUsuario, setNoUsuario] = useState(false);

    const incrementar = () => {
        setContador(contador + 1);
    };

    const decrementar = () => {
        if (contador > 1) {
            setContador(contador - 1);
        }
    };

    const input = {
        carritoId: carritoId,
        productId: productId,
        cantidad: contador,
        estado: "pendiente"
    };

    const fetchCarritoActualizado = async () => {
        try {
            const response = await axios.get(`/carrito/${carritoId}`);
            if (response.data.success) {
                localStorage.setItem('carrito', JSON.stringify(response.data.carrito));
            } else {
                toast.error('Error al obtener el carrito actualizado.', {
                    toastId: 'error-toast',
                });
            }
        } catch (error) {
            toast.error('Error al obtener el carrito actualizado. Por favor, inténtelo de nuevo más tarde.', {
                toastId: 'error-toast',
            });
        }
    };

    // const añadirAlCarrito = async () => {
    //     if (!userId) {
    //         // Si no hay usuario, manejar el carrito local
    //         const carritoLocal = JSON.parse(localStorage.getItem('carritoLocal')) || { productos: [] };

    //         const nuevoProducto = {
    //             productId: productId,
    //             cantidad: contador,
    //         };

    //         const index = carritoLocal.productos.findIndex(item => item.productId === productId);
    //         if (index >= 0) {
    //             carritoLocal.productos[index].cantidad += contador; // Si ya existe, aumentar la cantidad
    //         } else {
    //             carritoLocal.productos.push(nuevoProducto); // Si no, agregar el nuevo producto
    //         }

    //         localStorage.setItem('carritoLocal', JSON.stringify(carritoLocal));

    //         toast.success(`Añadido al carrito local: ${contador} artículo(s)`, {
    //             toastId: 'local-carrito-toast',
    //         });
    //     } else {
    //         // Si hay usuario, manejar el carrito del usuario
    //         try {
    //             const response = await axios.put('/carrito', input, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             if (response.data.success) {
    //                 await fetchCarritoActualizado();
    //                 toast.success(`Añadido al carrito: ${contador} artículo(s)`, {
    //                     toastId: 'add-success-toast',
    //                 });
    //             } else {
    //                 toast.error('Error al añadir al carrito.', {
    //                     toastId: 'error-toast',
    //                 });
    //             }
    //         } catch (error) {
    //             toast.error('Error al añadir al carrito. Por favor, inténtelo de nuevo más tarde.', {
    //                 toastId: 'error-toast',
    //             });
    //         }
    //     }
    // };

    const añadirAlCarrito = async () => {
        if (!userId) {
            // Si no hay usuario, manejar el carrito local
            const carritoLocal = JSON.parse(localStorage.getItem('carritoLocal')) || { productos: [] };
    
            const nuevoProducto = {
                productId: productId,
                cantidad: contador,
            };
    
            // Encuentra el índice del producto en el carrito local
            const index = carritoLocal.productos.findIndex(item => item.productId === productId);
    
            if (index >= 0) {
                // Si el producto ya existe, actualizar la cantidad
                carritoLocal.productos[index].cantidad += contador;
            } else {
                // Si el producto no existe, agregar el nuevo producto
                carritoLocal.productos.push(nuevoProducto);
            }
    
            // Actualiza el carrito local en el localStorage
            localStorage.setItem('carritoLocal', JSON.stringify(carritoLocal));
    
            // Mostrar mensaje de éxito
            toast.success(`Añadido al carrito local: ${contador} artículo(s)`, {
                toastId: 'local-carrito-toast',
            });
        } else {
            // Si hay usuario, manejar el carrito del usuario
            try {
                const response = await axios.put('/carrito', input, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.data.success) {
                    await fetchCarritoActualizado();
                    toast.success(`Añadido al carrito: ${contador} artículo(s)`, {
                        toastId: 'add-success-toast',
                    });
                } else {
                    toast.error('Error al añadir al carrito.', {
                        toastId: 'error-toast',
                    });
                }
            } catch (error) {
                toast.error('Error al añadir al carrito. Por favor, inténtelo de nuevo más tarde.', {
                    toastId: 'error-toast',
                });
            }
        }
    };
    
    return (
        <div className="flex flex-row items-center mt-12">

            {noUsuario && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 shadow-md">
                    <div className="bg-white p-8 rounded-sm shadow-lg relative">
                        <button 
                            className="absolute top-0 right-0 mt-2 mr-2"
                            onClick={() => setNoUsuario(false)}
                        >
                            <IoCloseOutline className='text-[25px] text-gray-800 hover:text-gray-500' />
                        </button>
                        <p className="text-lg mb-4 font-semibold">Para agregar productos a tu carrito es necesario que inicies sesión.</p>
                        <div className="flex justify-center">
                            <Link to="/login">
                                <button 
                                    className="text-sm py-2 bg-rojo text-white rounded-sm hover:bg-black focus:outline-none mr-4 w-[175px]"
                                    onClick={() => setNoUsuario(false)}
                                >
                                    Iniciá sesión
                                </button>
                            </Link>
                            <Link to="/register">
                                <button 
                                    className="text-sm py-2 bg-rojo text-white rounded-sm hover:bg-black focus:outline-none w-[175px]"
                                    onClick={() => setNoUsuario(false)}
                                >
                                    Registrate
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-row items-center mr-2">
                <button 
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none mr-2"
                    onClick={decrementar}
                >
                    -
                </button>
                <span className="text-xl font-semibold">{contador}</span>
                <button 
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none ml-2"
                    onClick={incrementar}
                >
                    +
                </button>
            </div>
            <button 
                className="px-4 py-2 bg-rojo text-white rounded-md hover:bg-red-800 focus:outline-none"
                onClick={añadirAlCarrito}
            >
                Añadir al carrito
            </button>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
                queue={false}
                theme="colored"
                transition={Zoom}
            />
        </div>
    );
};
