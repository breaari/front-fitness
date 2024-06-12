import { IoClose } from "react-icons/io5";
export const OpcionesDeEnvio = ({toggleCompletarEnvioCorreo, toggleCompletarEnvioGratis, toggleMostrarOpcionesEnvio, input, setInput, setMetodoEnvio}) => {

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" >
        <div className="bg-white py-4 px-8 rounded-sm shadow-md w-[700px]">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-bold mb-6 text-center">Seleccioná un método de envío</h2>
            <IoClose className="mb-6 cursor-pointer text-xl text-end" onClick={toggleMostrarOpcionesEnvio} />
          </div>
            <div className="flex flex-row">
              <div className="flex flex-col items-center mr-4">
                <button 
                    className="bg-rojo hover:bg-black text-white font-semibold py-2 px-4 rounded-sm w-[150px] mb-4" 
                    onClick={() => {
                        toggleCompletarEnvioGratis();
                        setInput({
                            ...input,
                            metodo_envio: "envio gratis"
                        });
                        setMetodoEnvio("envio gratis")
                    }}>
                    Envío gratis
                </button>
                <p className="text-sm w-[250px] text-center font-semibold">Dentro de la ciudad de Mar del Plata.</p>
              </div>
              <div className="flex flex-col items-center">
                <button 
                    className="bg-rojo hover:bg-black text-white font-semibold py-2 px-4 rounded-sm w-[150px]" 
                    onClick={() => {
                        toggleCompletarEnvioCorreo();
                        setInput({
                            ...input,
                            metodo_envio: "por correo"
                        });
                        setMetodoEnvio("por correo")
                    }}>
                    Por correo
                </button>
                <p className="text-sm w-[250px] text-center font-semibold">Enviamos tu pedido a cualquier lugar de Argentina a través del servicio de correo. El costo del envío será asumido por el destinatario al momento de retirar/recibir el paquete.</p>
                </div>
            </div>
        </div>
    </div>
    )
}