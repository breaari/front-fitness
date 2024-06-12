import React, { useState } from "react";
import { TbCreditCardPay } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

export const Metodosdepago = () => {
    
    const [show, setShow] = useState(false)

    const handleShow = () => {
        if(show) {
            setShow(false)
        } else
        setShow(true)
        
    }

    return (
        <div className="w-[600px]">
            <div onClick={handleShow} className="flex flex-row items-center justify-center p-3 cursor-pointer">
                <TbCreditCardPay className="text-[38px]"/>
                    <h1 className="font-bold text-2xl italic m-3">MÉTODOS DE PAGO</h1>
                <IoIosArrowDown className={`text-[20px] ml-2 transform ${show ? 'rotate-180' : ''}`}/>
            </div>
            {show && (
                <div className="flex flex-col justify-center">
            <div className="mx-3">
                <h2 className="font-bold mx-3">Transferencia Bancaria</h2>
                    <p className="m-3">Al seleccionar este método, una vez realizada la compra, tendrás un lapso de 48 horas para realizar la transferencia. Si no recibimos la confirmación dentro de este período, tu pedido será dado de baja.</p>
                <h2 className="font-bold mx-3">Pago en Efectivo (Contra Entrega - Mar del Plata)</h2>
                    <p className="m-3">Si te encuentras en Mar del Plata, también ofrecemos la opción de pagar en efectivo contra entrega. Esto significa que puedes pagar en efectivo cuando recibas tu pedido en la dirección especificada.</p>
                <h2 className="font-bold mx-3">Mercado Pago</h2>
                    <p className="mx-3 mt-3 mb-6">Aceptamos pagos a través de Mercado Pago, una plataforma segura y conveniente que te permite realizar pagos en línea de forma rápida y sencilla. Puedes utilizar diversos métodos de pago, como tarjetas de crédito, débito y efectivo a través de puntos de pago.</p>
            </div>
            </div>
            )}
        </div>
    )
}