import React, { useState } from "react";
import { TbShoppingCartBolt } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

export const ComoComprar = () => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
        if(show) {
            setShow(false)
        } else
        setShow(true)
        
    }

    return (
        <div className="flex justify-center items-center flex-col w-[600px]">
            <div onClick={handleShow} className="flex flex-row items-center justify-center p-3 cursor-pointer w-[400px]">
                <TbShoppingCartBolt className="text-[38px]"/>
                    <h1 className="font-bold text-2xl italic m-3 ">¿CÓMO COMPRAR?</h1>
                <IoIosArrowDown className={`text-[20px] ml-2 transform ${show ? 'rotate-180' : ''}`}/>
            </div>
            {show && (
            <div className="mx-3 flex flex-col justify-center">
            <p className="mx-3 mb-3">Comprar en nuestra tienda online es fácil y seguro. Siga estos simples pasos para realizar su compra:</p>
            <ol className="list-disc ml-8">
                <li className="mx-3"><strong>Seleccione los productos:</strong> Explore nuestra amplia selección de productos y agregue los artículos que desee comprar a su carrito de compras haciendo clic en el botón "Agregar al carrito".</li>
                <li className="mx-3"><strong>Revisar el carrito:</strong>  Una vez que haya seleccionado todos los productos que desea comprar, vaya al carrito de compras para revisar su pedido. Aquí puede verificar los productos, cantidades, precios y subtotal antes de proceder con la compra.</li>
                <li className="mx-3"><strong>Proceso de pago:</strong>  Haga clic en el botón "Finalizar compra" para emitir su pedido.</li>
                <li className="mx-3"><strong>Confirmación del pedido:</strong> Enviar un mensaje con número de pedido o email a nuestro Whatsapp para poder coordinar método de pago y envío, su pedido quedará confirmado una vez esté procesado el pago.</li>
                <li className="mx-3"><strong>Seguimiento del pedido:</strong>  Puede realizar un seguimiento del estado de su pedido en cualquier momento comunicandosé con nosotros a través de Whatsapp.</li>
            </ol>
            <p className="mx-3 my-3">¡Y eso es todo! Si tiene alguna pregunta o necesita asistencia adicional durante el proceso de compra, no dude en comunicarse. Estamos aquí para ayudarlo.</p>
            </div>
            )}
        </div>
    );
};

