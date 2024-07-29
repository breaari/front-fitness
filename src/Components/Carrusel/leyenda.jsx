import imagen1 from "../../assets/1.png";

export const Leyenda = () => {
    return (
         <div className="flex flex-row p-2 items-center">
                <div className="flex flex-col justify-center items-start mr-4">
                    <h1 className="text-lg font-bold mq980:text-[15px]">ENVÍO GRATIS</h1>
                    <p className="text-[12px]">En compras superiores a $50.000,00 en Mar del Plata</p>
                </div>
                <img src={imagen1} className='h-20 w-20 object-cover' alt="Envio Gratis"></img>
            </div>
    )
}