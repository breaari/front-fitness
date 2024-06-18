import React from "react";
import { Enviosyentregas } from "./enviosyentregas";
import { ComoComprar } from "./comocomprar";
import { ComprasMayoristas } from "./comprasmayoristas";
import { Metodosdepago } from "./metodosdepago";

export const Informacion = () => {
    return (
        <div className="py-4 flex flex-col justify-center text-center items-center min-h-screen">
            <h1 className="font-bold italic text-3xl flex justify-center mb-3">PREGUNTAS FRECUENTES</h1>
            <ComoComprar></ComoComprar>
            <Enviosyentregas></Enviosyentregas>
            <ComprasMayoristas></ComprasMayoristas>
            <Metodosdepago></Metodosdepago>
        </div>
    )
}