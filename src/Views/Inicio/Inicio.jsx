import React from "react";
import { Carrusel } from "../../Components/Carrusel/Carrusel";
import { Categorias } from "../../Components/Categorias/Categorias";
import { Principal } from "../../Components/Principal/Principal";

export const Inicio = () => {
    return (
        <>
        <Carrusel></Carrusel>
        <Principal></Principal>
        <Categorias></Categorias>
        </>
    )
}