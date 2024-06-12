import React, { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

export const Enviosyentregas = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
        if(show) {
            setShow(false)
            setEnviosShow(false)
            setSucursalShow(false)
            setSeguimientoShow(false)
        } else
        setShow(true)
    }

    return (
        <div className="w-[600px]">
            <div onClick={handleShow} className="flex flex-row items-center justify-center p-3 cursor-pointer">
                <TbTruckDelivery className="text-[38px]"/>
                    <h1 className="font-bold text-2xl italic m-3" onClick={handleShow}>ENVÍOS Y ENTREGAS</h1>
                <IoIosArrowDown className={`text-[20px] ml-2 transform ${show ? 'rotate-180' : ''}`}/>
            </div>
            {show && (
                <div className="flex flex-col justify-center">
                    <h2 className="font-semibold mx-6 mb-3">Envío a domicilio</h2>
                        <div className="mx-6 mb-3"> 
                            <ol className="list-disc ml-8">
                                <li><strong>Mar del Plata: </strong>Utilizamos nuestro propio transporte interno de <span className="text-rojo italic">Para Vos Fitness</span> para envíos en Mar del Plata.</li>
                                <li><strong>Resto del país: </strong> Trabajamos con una variedad de transportes y correos privados. Al ingresar su código postal durante la compra, se le ofrecerán opciones de envío disponibles para su dirección.</li> 
                            </ol>
                        </div>
                    <h2 className="font-semibold mx-6 mb-3">Envío a sucursal</h2>
                        <p className="mx-6 mb-3"> Si hay sucursales de correo cerca de su código postal, le daremos la opción de recibir su pedido en una sucursal. Recibirá un correo electrónico cuando su pedido esté listo para retirar.</p>
                    <h2 className="font-semibold mx-6 mb-3">Seguimiento</h2>
                        <div className="mx-6 mb-6"> 
                            <ol className="list-disc ml-8">
                                <li><strong>Mar del Plata (Transporte interno): </strong>Puede comunicarse por <a href='https://api.whatsapp.com/send?phone=5491136002250' target="_blank" rel="noopener noreferrer">Whatsapp</a> para consultar el estado del seguimiento.</li>
                                <li><strong>Resto del país: </strong>Le enviaremos un correo electrónico con el enlace de seguimiento cuando despachemos su pedido.</li>
                            </ol>
                        </div>
                </div>
            )}
        </div>
    )
}