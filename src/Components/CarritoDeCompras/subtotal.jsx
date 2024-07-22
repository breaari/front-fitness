import { useEffect, useState } from "react";
import { OpcionesDeEnvio } from "./opcionesEnvio";
import { EnvioGratis } from "./envioGratis";
import { EnvioCorreo } from "./envioCorreo";
import axios from 'axios'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { ModalPago } from "./modalPago";
import { useLocation } from "react-router-dom";
import { PagoExitoso } from "../mercadoPago/pagoExitoso";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Subtotal = ({carrito, productos, setProductos, setCarrito, carritoId}) => {

  initMercadoPago('TEST-f120ece3-3342-40db-8290-a074b436db09'); 

    const [subtotal, setSubtotal] = useState(0);
    const totalProductos = carrito ? carrito.productos.length : 0
    const [mostrarOpcionesEnvio, setMostrarOpcionesEnvio] = useState(false);
    const [completarEnvioGratis, setCompletarEnvioGratis] = useState(false)
    const [completarEnvioCorreo, setCompletarEnvioCorreo] =  useState(false)
    const [metodoEnvio, setMetodoEnvio] = useState("");
    // const [datosListos, setDatosListos] = useState(false);

    console.log("carrito:", carrito)

    useEffect(() => {
      // Calcula el subtotal cuando cambian los productos
      if (productos.length > 0) {
          let total = 0;

          productos.forEach((producto) => {
              // Si el producto tiene precio promo, se usa ese, de lo contrario, se usa el precio venta
              const precio = parseFloat(producto.preciopromo) || parseFloat(producto.precioventa);
              total += precio * producto.cantidad;
          });

            setSubtotal(total.toFixed(2));
        }
    }, [productos]);

    const toggleMostrarOpcionesEnvio = () => {
      setMostrarOpcionesEnvio(!mostrarOpcionesEnvio);
    };

    const toggleCompletarEnvioGratis = () => {
      setCompletarEnvioGratis(!completarEnvioGratis);
      setMostrarOpcionesEnvio(false)
    };

    const toggleCompletarEnvioCorreo = () => {
      setCompletarEnvioCorreo(!completarEnvioCorreo);
      setMostrarOpcionesEnvio(false)
    };

    useEffect(() => {
      if (carrito && carrito.productos && productos && productos.length > 0) {
        setInput((prevInput) => ({
          ...prevInput,
          pedido: carrito.productos.map((productoEnCarrito) => {

            const producto = productos.find(p => p.id.toString() === productoEnCarrito.productId.toString());

            return {
              productId: productoEnCarrito.productId,
              cantidad: productoEnCarrito.cantidad,
              precioVenta: producto ? producto.precioventa : 0,
              precioPromo: producto ? producto.preciopromo : 0
            };
          }),
          total: subtotal,
        }));
        
      } else {
        console.log("Datos insuficientes para procesar el pedido");
      }
    }, [carrito, productos, subtotal]);
    
    const userId = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")).id : null;

    const initialInput = {
      userId: userId,
      pedido: carrito ? carrito.productos.map(productoEnCarrito => {
        const producto = productos.find(p => p.id === productoEnCarrito.productId);
        return {
          productId: productoEnCarrito.productId,
          cantidad: productoEnCarrito.cantidad,
          precioVenta: producto ? producto.precioventa : 0,
          precioPromo: producto ? producto.preciopromo : 0
        };
      }) : [],
      estado: "pendiente",
      metodo_envio: "",
      direccion_entrega: "",
      tipo_direccion: "",
      indicaciones_entrega: "",
      empresa_transporte: "",
      sucursal_o_domicilio: "",
      numero_contacto: "",
      total: subtotal,
      pago_id: "",
    };
  
  const [input, setInput] = useState(initialInput)

  console.log("inout:", input)

  const handleChange = (data) => {
    setInput({
        ...input,
        ...data
    });
  };

const handleSubmit = async () => {
  try {
    const response = await axios.post("/pedido", input);
    const id_pedido = response.data.pedido.id
    localStorage.setItem("lastPedidoId", id_pedido);
  } catch (error) {
    console.error("Error:", error);
  }
};
const [pagarHabilitado, setPagarHabilitado] = useState(false)
const [modalPago, setModalPago] = useState(false)
const [preferenceId, setPreferenceId]= useState("")
const toggleModalPago = () => {
  setModalPago(!modalPago);
};

const handleFinalizarCompra = async () => {
  if (!input.metodo_envio) {
    if (!toast.isActive('error-toast')) {
      toast.error('Seleccione un método de envío por favor', {
          toastId: 'error-toast',
      });
  }
    return
 
  }

  if (input.metodo_envio === "envio gratis") {
    if (!input.direccion_entrega || !input.numero_contacto || !input.tipo_direccion) {
      if (!toast.isActive('error-toast')) {
        toast.error('Faltan completar datos de envío', {
            toastId: 'error-toast',
        });
      return
    }
      
    }
  } else if (input.metodo_envio === "por correo") {
    if (!input.direccion_entrega || !input.numero_contacto || !input.sucursal_o_domicilio || !input.empresa_transporte) {
      
      if (!toast.isActive('error-toast')) {
        toast.error('Faltan completar datos de envío', {
            toastId: 'error-toast',
        });
      }}
      return 
  }

  setPagarHabilitado(true)

 

  try {
    if (pagarHabilitado) {

      handleSubmit(); 
    const response = await axios.post("/create_preference", {
      description: "Tu compra en Para Vos - Fitness",
      price: subtotal,
      quantity: 1
    });

    if (response.data.success) {
      setPreferenceId(response.data.id);
      setModalPago(true);
    } else {
      console.error("Error al crear la preferencia de pago:", response.data.message);
    }
  } else {
    return
  }
  } catch (error) {
    console.error("Error:", error);
  }
};

const location = useLocation();
const queryParams = new URLSearchParams(location.search);

const [pagoExitoso, setPagoExitoso] = useState(false)

const togglePagoExitoso = () => {
  setPagoExitoso(!pagoExitoso);
};

const status = queryParams.get('status');
const paymentId = queryParams.get('payment_id');
const id_lastPedido = localStorage.getItem('lastPedidoId');

useEffect(() => {
  async function handlePaymentApproval() {

    if (status === 'approved' && paymentId && id_lastPedido) {
      try {
        await axios.put("/carrito", { carritoId: carritoId, vaciarCarrito: true });
        setCarrito({ ...carrito, productos: [] });
        setSubtotal(0);

        await axios.put(`/pedido/${id_lastPedido}`, { estado: "pago exitoso", id_pago: paymentId });

        setPagoExitoso(true);
      } catch (error) {
        console.error("Error processing payment approval:", error);
      }
    }
  }

  handlePaymentApproval();
}, [status, paymentId, id_lastPedido]);

const handleButtonClick = () => {
  if (metodoEnvio === "envio gratis") {
    toggleCompletarEnvioGratis();
  } else if (metodoEnvio === "por correo") {
    toggleCompletarEnvioCorreo();
  }
};

    return (

    <div className={`mt-[74px] w-[40%] mq980:w-full mq980:mt-0 mq980:mb-6 ${!productos.length ? 'text-gray-200' : ''}`}>
    <div className={`mx-6 pt-4 pb-8 px-12 border ${!productos.length ? 'border-gray-200' : 'border-gray-200 shadow-md'} mt-10`}>
      <h1 className="italic text-xl font-bold p-4 text-center">RESUMEN DE COMPRA</h1>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <p>Total productos({totalProductos})</p>
          <p>${subtotal}</p>
        </div>
        <div className="flex flex-row justify-between mt-2">
          <p>Envío</p>
          <button 
            onClick={toggleMostrarOpcionesEnvio} 
            disabled={!productos.length}
            className={`${!productos.length ? 'text-gray-200' : 'text-rojo'} hover:underline`}
          >
            {metodoEnvio === "envio gratis" ? "Envío Gratis" : metodoEnvio === "por correo" ? "Envío por correo" : "Seleccionar envío"}
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <p></p>
          <button
            onClick={handleButtonClick} 
            disabled={!productos.length || !metodoEnvio}
            className={`${!productos.length || !metodoEnvio ? 'text-gray-200' : 'text-black'} text-sm hover:underline` }
          >
            {metodoEnvio === "" ? "Completar datos de envío" : input.direccion_entrega ? input.direccion_entrega : "Completar datos de envío"}
          </button>
        </div>
        <div className="flex justify-center items-center mt-8">
          <button 
            className={`rounded-sm py-2 px-4 text-lg font-semibold ${!productos.length ? 'bg-gray-200 text-white cursor-not-allowed' : 'bg-rojo hover:bg-black text-white'}`} 
            onClick={handleFinalizarCompra}
            disabled={!productos.length}
          >
            Finalizar compra
          </button>
          
        </div>
        {mostrarOpcionesEnvio && (
          <OpcionesDeEnvio 
            toggleCompletarEnvioCorreo={toggleCompletarEnvioCorreo} 
            toggleCompletarEnvioGratis={toggleCompletarEnvioGratis} 
            toggleMostrarOpcionesEnvio={toggleMostrarOpcionesEnvio} 
            input={input}
            setInput={setInput}
            setMetodoEnvio={setMetodoEnvio}
          />
        )}
        {completarEnvioGratis && (
          <EnvioGratis toggleCompletarEnvioGratis={toggleCompletarEnvioGratis} handleChange={handleChange} input={input} />
        )}
        {completarEnvioCorreo && (
          <EnvioCorreo toggleCompletarEnvioCorreo={toggleCompletarEnvioCorreo} handleChange={handleChange} />
        )}
        { modalPago && (
          <ModalPago toggleModalPago={toggleModalPago} preferenceId={preferenceId}></ModalPago>
        )}
        { pagoExitoso && (
          <PagoExitoso togglePagoExitoso={togglePagoExitoso}/>
        )}

      </div>
    </div>
    <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  limit={1}
                  queue={false}
                  theme="colored"
                  transition={Zoom}
                />
  </div>

    )
}