import imagen4 from "../../assets/4.png";

export const Leyenda4 = () => {
    return (
        <div className="flex p-2 items-center">
                <div className="flex flex-col justify-center items-start mr-4">
                    <h1 className="text-lg font-bold mq980:text-[15px]">ENVÍOS A NIVEL NACIONAL</h1>
                    <p className="text-[12px]">Llevamos tus compras a cualquier rincón del país</p>
                </div>
                <img src={imagen4} className='h-20 w-20 object-cover' alt="Envios Nacionales"></img>
            </div>
    )
}