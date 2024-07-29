import imagen3 from "../../assets/3.png";

export const Leyenda3 = () => {
    return (
        <div className="flex p-2 items-center">
        <div className="flex flex-col justify-center items-start mr-4">
            <h1 className="text-lg font-bold mq980:text-[15px]">¡DESCUENTO EXCLUSIVO!</h1>
            <p className="text-[12px]">Aprovechá un 10% de descuento en toda la tienda</p>
        </div>
        <img src={imagen3} className='h-20 w-20 object-cover' alt="Descuento Exclusivo"></img>
        </div>
    )
}