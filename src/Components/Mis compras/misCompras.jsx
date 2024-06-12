import { useEffect, useState } from "react";
import axios from 'axios';
import { TbShoppingBagCheck } from "react-icons/tb";

export const MisCompras = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtén el ID del usuario de localStorage
    const userId = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")).id : null;
  
    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get("/pedido");
                const allPedidos = response.data;
          
                // Filtra los pedidos por userId
                const userPedidos = allPedidos.pedidos.filter(pedido => pedido.userId === userId);
                
                setPedidos(userPedidos);
            } catch (err) {
                setError("Error al obtener los pedidos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchPedidos();
        } else {
            setLoading(false);
            setError("Usuario no encontrado");
        }
    }, [userId]);


    const formatFechaHora = (fechaString, horaString) => {
        const fecha = new Date(fechaString);
        const optionsFecha = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const optionsHora = { hour: '2-digit', minute: '2-digit' };
        
        const fechaFormateada = fecha.toLocaleDateString('es-ES', optionsFecha).replace(/\//g, '-');
        const horaFormateada = new Date(`1970-01-01T${horaString}Z`).toLocaleTimeString('es-ES', optionsHora)

        return { fechaFormateada, horaFormateada };
    };


    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mt-[74px] p-4">
            <div className="flex flex-row items-center p-4">
                <TbShoppingBagCheck className='text-[38px]'/>
                <h1 className='italic font-bold text-2xl mt-2'>MIS COMPRAS</h1>
            </div>
            <div className="flex flex-row font-semibold border-b py-3 px-6">
                <p className="w-[25%]">Fecha y hora</p>
                <p className="w-[25%]">Estado</p>
                <p className="w-[25%]">Link de seguimiento</p>
                <p className="w-[25%]">Acciones</p>
            </div>
            {pedidos.length > 0 ? (
                <div>
                    {pedidos.map(pedido => {
                        const { fechaFormateada, horaFormateada } = formatFechaHora(pedido.fecha, pedido.hora);
                        return (
                            <div key={pedido.id} className="flex flex-row border-b py-2 px-6">
                                <p className="w-[25%]">{fechaFormateada} {horaFormateada}hs</p>
                                <p className="w-[25%]">{pedido.estado}</p>
                                <p className="w-[25%]">Link de seguimiento</p>
                                <p className="w-[25%]">Acciones</p>
                                {/* Puedes añadir más detalles del pedido aquí */}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No tienes compras aún.</p>
            )}
        </div>
    );
};
