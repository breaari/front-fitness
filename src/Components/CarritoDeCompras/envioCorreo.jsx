import { useState } from "react";
import { IoClose } from "react-icons/io5";

export const EnvioCorreo = ({ toggleCompletarEnvioCorreo, handleChange }) => {
  const [datosEnvio, setDatosEnvio] = useState({
    empresa_transporte: "",
    sucursal_o_domicilio: "",
    direccion_entrega: "",
    numero_contacto: "",
    tipo_direccion: "",
    indicaciones_entrega: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosEnvio({
      ...datosEnvio,
      [name]: value
    });
  };

  const handleGuardar = () => {
    handleChange(datosEnvio);
    toggleCompletarEnvioCorreo();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white py-8 px-8 rounded-sm shadow-md w-[700px]">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold mb-6 text-center">Completá los datos del envío</h2>
          <IoClose className="mb-6 cursor-pointer text-xl text-end" onClick={toggleCompletarEnvioCorreo} />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col">
            <label className=" font-semibold">Empresa de transporte</label>
            <input
              name="empresa_transporte"
              className="border border-gray-300 shadow-md py-1 px-2 w-[275px] focus:outline-none"
              placeholder="ej: Andreani"
              value={datosEnvio.empresa_transporte}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className=" font-semibold">Sucursal o domicilio</label>
            <input
              name="sucursal_o_domicilio"
              className="border border-gray-300 shadow-md py-1 px-2 w-[275px] focus:outline-none"
              placeholder="ej: domicilio"
              value={datosEnvio.sucursal_o_domicilio}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className=" font-semibold">Dirección</label>
            <input
              name="direccion_entrega"
              className="border border-gray-300 shadow-md py-1 px-2 w-[275px] focus:outline-none"
              placeholder="ej: Manuel Castro 4356, Lanus Oeste, Buenos Aires."
              value={datosEnvio.direccion_entrega}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className=" font-semibold">Número de contacto</label>
            <input
              name="numero_contacto"
              className="border border-gray-300 shadow-md py-1 px-2 w-[275px] focus:outline-none"
              placeholder="ej: 11 3600-2250"
              value={datosEnvio.numero_contacto}
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
