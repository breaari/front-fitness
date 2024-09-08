// import { IoClose } from "react-icons/io5";
// export const ModalTelefonoSI = ({updateUserId, toggleTelefonoSI}) => {

//     return (
//         <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" >
//         <div className="bg-white py-4 px-8 rounded-sm shadow-md w-[700px] mq980:max-w-full">
//           <div className="flex flex-row items-center justify-between">
//             <h2 className="text-xl font-bold mb-6 text-center"></h2>
//             <IoClose className="mb-6 cursor-pointer text-xl text-end" onClick={toggleTelefonoSI} />
//           </div>
//             <div className="flex flex-col justify-center items-center"> 
//             <h2 className="text-xl font-bold mb-6 text-center">Por favor, dejanos tu teléfono para que podamos contactarte por tu compra!</h2>
//             <input 
//             type="number"
//             placeholder="Ej: 1136002250"
//             className="text-xl border border-gray-300 shadow-md py-1 px-2 w-[275px] outline-none mb-8"
//             onClick={updateUserId}
//             ></input>
//             </div>
//         </div>
//     </div>
//     )
// }

import { IoClose } from "react-icons/io5";

export const ModalTelefonoSI = ({ updateTelefono, toggleTelefonoSI }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateTelefono(e.target.value); // Solo actualizar el userId cuando se presione Enter
      toggleTelefonoSI();
    }
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white py-4 px-8 rounded-sm shadow-md w-[700px] mq980:max-w-full">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold mb-6 text-center"></h2>
          <IoClose className="mb-6 cursor-pointer text-xl text-end" onClick={toggleTelefonoSI} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold mb-6 text-center">
            Por favor, dejanos tu teléfono para que podamos contactarte por tu compra!
          </h2>
          <input
            type="number"
            placeholder="Ej: 1136002250"
            className="text-xl border border-gray-300 shadow-md py-1 px-2 w-[275px] outline-none mb-8"
            onKeyDown={handleKeyDown} // Escuchar la tecla Enter para capturar el valor del input
          />
        </div>
      </div>
    </div>
  );
};
