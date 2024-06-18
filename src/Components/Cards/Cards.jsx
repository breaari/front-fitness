import { Card } from "./Card"
import { useSelector } from "react-redux"
export const Cards = () => {

    const productos = useSelector((state) => state.fitness.productos);
 
    return (
        <div className="flex justify-center items-center mb-10">
            { !productos.length && (
                <div className="text-gris mt-10">No se encontraron productos para la búsqueda especificada.</div>
            )}
            <div className="flex flex-wrap gap-5 mq980:gap-1 mq980:justify-center">
            {productos.map((producto) => (
                <Card key={producto.id} producto={producto} />
            ))}
        </div>
       </div>
    )
}