import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export const EnvioGratis = ({ toggleCompletarEnvioGratis, handleChange, input }) => {
    const [datosEnvio, setDatosEnvio] = useState({
        direccion_entrega: "",
        tipo_direccion: "",
        numero_contacto: "",
        indicaciones_entrega: "",
        empresa_transporte: "",
        sucursal_o_domicilio: ""
      });
      
      useEffect(() => {
        setDatosEnvio({
          direccion_entrega: input.direccion_entrega || "",
          tipo_direccion: input.tipo_direccion || "",
          numero_contacto: input.numero_contacto || "",
          indicaciones_entrega: input.indicaciones_entrega || "",
          empresa_transporte: input.empresa_transporte || "",
          sucursal_o_domicilio: input.sucursal_o_domicilio || ""
        });
      }, [input]);

      console.log("dara:", datosEnvio.direccion_entrega)

      console.log("input:", input)
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosEnvio({
          ...datosEnvio,
          [name]: value
        });
      };
    
      const handleGuardar = () => {
        handleChange(datosEnvio);
        toggleCompletarEnvioGratis();
      };
    
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white py-8 px-8 rounded-sm shadow-md w-[700px]">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold mb-6 text-center">Completá los datos del envío</h2>
          <IoClose className="mb-6 cursor-pointer text-xl text-end" onClick={toggleCompletarEnvioGratis} />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col">
            <label className=" font-semibold">Dirección</label>
            <input
              name="direccion_entrega"
              className="border border-gray-300 shadow-md py-1 px-2 w-[275px]"
              placeholder="ej: Sarmiento 2178"
              value={datosEnvio.direccion_entrega}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className=" font-semibold">Tipo de dirección</label>
            <input
              name="tipo_direccion"
              className="border border-gray-300 shadow-md py-1 px-2 w-[275px]"
              placeholder="ej: casa, departamento, trabajo..."
              value={datosEnvio.tipo_direccion}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className=" font-semibold">Número de contacto</label>
            <input
              name="numero_contacto"
              className="border border-gray-300 shadow-md py-1 px-2 w-[275px]"
              placeholder="ej: 11 3600-2250"
              value={datosEnvio.numero_contacto}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className=" font-semibold">Indicaciones para la entrega</label>
            <input
              name="indicaciones_entrega"
              className="border border-gray-300 shadow-md py-1 px-2 w-[275px]"
              placeholder="ej: no anda el timbre"
              value={datosEnvio.indicaciones_entrega}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          className="bg-rojo hover:bg-black text-white font-semibold py-2 px-4 rounded-sm w-[150px] mt-8"
          onClick={handleGuardar}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
