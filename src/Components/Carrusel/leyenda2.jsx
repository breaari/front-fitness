import imagen2 from "../../assets/2.png";

export const Leyenda2 = () => {
    return (
        <div className="flex p-2 items-center">
        <div className="flex flex-col justify-center items-start mr-4">
            <h1 className="text-lg font-bold mq980:text-[15px]">COMPRA MAYORISTA</h1>
            <p className="text-[12px]">Equipa o renová tu gimnasio con nuestros descuentos mayoristas</p>
        </div>
        <img src={imagen2} className='h-20 w-20 object-cover' alt="Compra Mayorista"></img>
        </div>
    )
}