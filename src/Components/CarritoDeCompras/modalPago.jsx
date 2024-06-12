import React from "react";
import { Wallet } from '@mercadopago/sdk-react';
import { IoClose } from "react-icons/io5";

export const ModalPago = ({ toggleModalPago , preferenceId}) => {

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white py-8 px-8 rounded-sm shadow-md w-[700px]">
                <div className="flex flex-row justify-between">
                <p className="font-bold">Métodos de pago</p>
                <IoClose className="mb-6 cursor-pointer text-xl text-end" onClick={toggleModalPago} />
                </div>
                <div className="flex flex-col items-center justify-center">
                        <button className="bg-rojo hover:bg-black rounded-md text-white font-semibold py-3 w-[280px]">Transferencia</button>
                        <p className="text-sm text-gray-500 mt-2">(15% off)</p>
                <Wallet
                    initialization={{ preferenceId: preferenceId }}
                    customization={{ texts: { valueProp: 'smart_option' } }}
                />
                </div>
            </div>
        </div>
    );
};
