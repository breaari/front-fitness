import React, { useState } from "react";
import { CarritoDeCompras } from "../../Components/CarritoDeCompras/carritoDeCompras";
import { Subtotal } from "../../Components/CarritoDeCompras/subtotal";

export const Carrito = () => {

    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || {};

    const carritoId = storedCarrito.id || ""

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState(null);

    return (
        <div className="flex flex-row mq980:flex-col">
           <CarritoDeCompras carritoId = { carritoId } setCarrito = { setCarrito } carrito = {carrito} setProductos={setProductos} productos = {productos }></CarritoDeCompras> 
           <Subtotal carritoId = { carritoId } setCarrito = { setCarrito } carrito = {carrito} setProductos={setProductos} productos = {productos }></Subtotal>
        </div>
    )
}