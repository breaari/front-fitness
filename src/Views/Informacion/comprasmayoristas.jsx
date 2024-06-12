import React, { useState } from "react";
import { TbShoppingCartPlus } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

export const ComprasMayoristas = () => {
    
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
                <TbShoppingCartPlus className="text-[38px]"/>
                    <h1 className="font-bold text-2xl italic m-3">COMPRAS MAYORISTAS</h1>
                <IoIosArrowDown className={`text-[20px] ml-2 transform ${show ? 'rotate-180' : ''}`}/>
            </div>
            {show && (
                <div className="mx-3">
            <div className="flex flex-col justify-center">
                <p className="mx-3 mb-3">En <span className="text-rojo italic">Para Vos Fitness</span>, ofrecemos descuentos especiales para compras mayoristas. Esto significa que si superas ciertos montos de compra, podrás beneficiarte de porcentajes de descuento adicionales.</p>
                    <h2 className="font-bold mx-3 mb-3">¿Cuáles son los montos mínimos para acceder a descuentos mayoristas?</h2>
                        <p className="mx-3">Actualmente, tenemos establecidos los siguientes montos mínimos de compra para acceder a descuentos mayoristas:</p>
                            <ol className="list-disc ml-8 mb-3">
                                <li className="mx-3">Para obtener un descuento del <strong>10%</strong>, el monto mínimo de compra es de $100,000,00 ARS.</li>
                                <li className="mx-3">Para obtener un descuento del <strong>20%</strong>, el monto mínimo de compra es de $200,000,00 ARS.</li>
                            </ol>
                    <h2 className="font-bold mx-3 mb-3">¿Cómo se aplican los descuentos en las compras mayoristas?</h2>
                        <p className="mx-3 mb-3">Una vez que tu compra alcance uno de los montos mínimos especificados, el sistema automáticamente aplicará el porcentaje de descuento correspondiente al total de tu compra. Este descuento se reflejará en el total de la factura antes de finalizar la compra.</p>
                        <p className="mx-3 mb-6">¡Aprovecha nuestros descuentos mayoristas y ahorra en tus compras al por mayor!</p>
            </div>
            </div>
            )}
        </div>
    )
}