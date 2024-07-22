import React, { useState } from "react";
import { RiContactsBookLine, RiLockPasswordLine } from "react-icons/ri"
import { HiOutlineMail } from "react-icons/hi";
import { PiEyeClosedBold } from "react-icons/pi";
import { PiEyeBold } from "react-icons/pi";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { isValidEmail } from "../Validations/isValidEmail";
import { isValidPassword } from "../Validations/isValidPassword";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const initialInput = {
        email: "",
        password: "",  
    }
        const [input, setInput ] = useState(initialInput);
    
        const initialErrors= {

          email: { valid: false, error: '' },
          password: { valid: false, error: '' },
    
      }
    
        const [inputError, setInputError ] = useState(initialErrors);
    
        const handleChange = async (e) => {
            const { name, value } = e.target;
        
              if (name === 'email') {
                const { valid, error } = isValidEmail(value);
                setInputError((prevInputError) => ({
                  ...prevInputError,
                  email: { valid, error }
                }));
              }
    
              if (name === 'password') {
                const { valid, error } = isValidPassword(value);
                setInputError((prevInputError) => ({
                  ...prevInputError,
                  password: { valid, error }
                }));
              }
              
            setInput((prevInput) => ({
              ...prevInput,
              [name]: value
            }));
          };

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Object.values(inputError).every(field => field.valid);
   
        if (!isValid) {
          if (!toast.isActive('error-toast')) {
            toast.error('Parece que algunos campos están incompletos.', {
              toastId: 'error-toast', 
            });
          }
          return;
        }
      
        try {

        setLoading(true)
        const responseBack = await axios.post("/login", input, {
          headers: {
            'Content-Type': 'application/json',
          },
    
        });
      
        localStorage.setItem('usuario', JSON.stringify(responseBack.data.user));
        localStorage.setItem('carrito', JSON.stringify(responseBack.data.carrito));
        setTimeout(() => {
          setLoading(false);
        }, 5000);
        goTo('/productos'); 
          
        } catch (error) {
          toast.error('Email y/o contraseña incorrectos, intente denuevo.', {
            toastId: 'error-toast', 
          });
          setLoading(false)
        }
      };

      const navigate = useNavigate()

      const goTo = (path) => {
          navigate(path);
          setShowProducts(false)
          setAccount(false)
      };

    return (
        <div className="flex justify-center">
        <form className="flex flex-col justify-center w-[400px] min-h-screen" onSubmit={handleSubmit}>
        {loading ? ( 
          <div className='flex justify-center items-center h-[350px]'>
             <box-icon name='loader-circle' animation='spin' color='#C41111' size="70px"></box-icon>
          </div>):(
          <div>
            <h1 className="font-bold italic text-2xl flex justify-center ">INICIÁ SESIÓN</h1>
                <div className="flex justify-center m-2">
                    <label className="flex flex-row justify-between items-center w-[300px] border-b-2 border-black px-2">
                        <HiOutlineMail className="text-[30px] flex justify-center" />
                        <input 
                              name="email"
                              onChange={handleChange}
                              placeholder="Usuario" 
                              className="px-4 py-2 flex justify-center text-xl w-[250px] focus:outline-none"
                        ></input>    
                    </label> 
                </div>
                <div className="flex justify-center m-2">
                    <label className="flex flex-row justify-between items-center w-[300px] border-b-2 border-black px-2">
                        <RiLockPasswordLine className="text-[30px] flex justify-center" />
                        <input 
                            name="password"
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Contraseña" 
                            className="px-4 py-2 flex justify-center text-xl w-[235px] focus:outline-none">
                        </input> 
                        <a onClick={handleShowPassword}>
                            {showPassword ? <PiEyeBold className="text-[20px]" /> : <PiEyeClosedBold className="text-[20px]" />}
                        </a> 
                    </label> 
                </div>
                <p className="flex justify-end mr-12 text-[14px] hover:underline my-2">Olvidé mi contraseña</p>
                <div className="flex justify-center my-2">
                <button className="bg-black text-white px-6 py-2 rounded-[2px] w-[200px] flex justify-center">
                    Iniciar sesión
                </button>
                </div>
                <p className="flex justify-center text-[14px] my-2">Aún no tienes una cuenta?<span className="hover:underline text-rojo cursor-pointer" onClick={() => goTo('/register')}>Registrate aquí</span></p>
                </div>
              )}
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
              
                </form>
        </div>
    )
}