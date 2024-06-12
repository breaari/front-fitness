import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri"
import { HiOutlineMail } from "react-icons/hi";
import { PiEyeClosedBold } from "react-icons/pi";
import { PiEyeBold } from "react-icons/pi";
import { RiUser3Line } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { isValidEmail } from "../Validations/isValidEmail";
import { isValidPassword } from "../Validations/isValidPassword";
import { isValidPasswordConfirm } from "../Validations/isValidPasswordConfirm";
import { isValidUsuario } from "../Validations/isValidUsuario";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Register = () => {

  const navigate = useNavigate()
    
    // Función para navegar a una ruta específica
    const goTo = (path) => {
        navigate(path);
    };

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const handleShowPasswordConfirm = () => {
        if (showPasswordConfirm) {
            setShowPasswordConfirm(false)
        } else {
            setShowPasswordConfirm(true)
        }
    }

    const initialInput = {
        usuario:"",
        email: "",
        password: "",  
        passwordConfirm: "",
        tipo: "usuario_comun"
    }
        const [input, setInput ] = useState(initialInput);
    
        const initialErrors= {
          usuario: { valid: false, error: '' },
          email: { valid: false, error: '' },
          password: { valid: false, error: '' },
          passwordConfirm: { valid: false, error: '' }
    
      }
    
        const [inputError, setInputError ] = useState(initialErrors);
    
        const handleChange = async (e) => {
            const { name, value } = e.target;

            if (name === 'usuario') {
                const { valid, error } = isValidUsuario(value);
                setInputError((prevInputError) => ({
                  ...prevInputError,
                  usuario: { valid, error }
                }));
              }
        
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

              if (name === 'passwordConfirm') {
                const { valid, error } = isValidPasswordConfirm(input.password, value);
                setInputError((prevInputError) => ({
                  ...prevInputError,
                  passwordConfirm: { valid, error }
                }));
              }
              
            setInput((prevInput) => ({
              ...prevInput,
              [name]: value
            }));
          };

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
          const responseBack = await axios.post("/register", input, {
            headers: {
              'Content-Type': 'application/json',
            },
      
          });
          
          toast.success('Usuario creado exitosamente, por favor inicie sesión', {
            toastId: 'delete-success-toast',
        });
        setTimeout(() => {
          setLoading(false);
        }, 5000);
        goTo("/login")
        
          
        } catch (error) {
          window.alert('Error al iniciar sesión')
        }
      };

    return (
        <div className="flex justify-center">
        <form className="mt-36 mb-16 flex flex-col justify-center w-[400px]" onSubmit={handleSubmit}>
        {loading ? ( 
          <div className='flex justify-center items-center h-[350px]'>
             <box-icon name='loader-circle' animation='spin' color='#C41111' size="70px"></box-icon>
          </div>):(
            <div>
            <h1 className="font-bold italic text-2xl flex justify-center ">REGISTRATE</h1>
                <div className="flex justify-center m-2">
                    <label className="flex flex-row justify-between items-center w-[300px] border-b-2 border-black px-2">
                        <RiUser3Line className="text-[30px] flex justify-center" />
                            <input 
                                value={input.usuario}  
                                onChange={handleChange}
                                name="usuario" 
                                placeholder="Usuario" 
                                className="px-4 py-2 flex justify-center text-xl w-[250px] focus:outline-none">
                            </input>    
                    </label> 
                </div>
                <p className="text-rojo flex justify-center text-[14px]">{inputError.usuario.error}</p>
                <div className="flex justify-center m-2">
                    <label className="flex flex-row justify-between items-center w-[300px] border-b-2 border-black px-2">
                        <HiOutlineMail className="text-[30px] flex justify-center" />
                            <input 
                                value={input.email}  
                                onChange={handleChange}
                                name="email" 
                                placeholder="Email" 
                                className="px-4 py-2 flex justify-center text-xl w-[250px] focus:outline-none">
                            </input>    
                    </label> 
                </div>
                <p className="text-rojo flex justify-center text-[14px]">{inputError.email.error}</p>
                <div className="flex justify-center m-2">
                    <label className="flex flex-row justify-between items-center w-[300px] border-b-2 border-black px-2">
                        <RiLockPasswordLine className="text-[30px] flex justify-center" />
                        <input
                            value={input.password}  
                            onChange={handleChange}
                            name="password"
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Contraseña" 
                            className="px-4 py-2 flex justify-center text-xl w-[235px] focus:outline-none">
                        </input> 
                        <a onClick={handleShowPassword}>
                            {showPassword ? <PiEyeBold className="text-[20px]" /> : <PiEyeClosedBold className="text-[20px]" />}
                        </a> 
                    </label> 
                </div>
                <p className="text-rojo flex justify-center text-[14px]">{inputError.password.error}</p>
                <div className="flex justify-center m-2">
                    <label className="flex flex-row justify-between items-center w-[300px] border-b-2 border-black px-2">
                        <RiLockPasswordFill className="text-[30px] flex justify-center" />
                        <input
                            value={input.passwordConfirm}  
                            onChange={handleChange}
                            name="passwordConfirm" 
                            type={showPasswordConfirm ? 'text' : 'password'} 
                            placeholder="Confirmar contraseña" 
                            className="px-4 py-2 flex justify-center text-xl w-[235px] focus:outline-none">
                        </input> 
                        <a onClick={handleShowPasswordConfirm}>
                            {showPasswordConfirm ? <PiEyeBold className="text-[20px]" /> : <PiEyeClosedBold className="text-[20px]" />}
                        </a> 
                    </label> 
                </div>
                <p className="text-rojo flex justify-center text-[14px] mb-2">{inputError.passwordConfirm.error}</p>
                <div className="flex justify-center my-2">
                <button className="bg-black text-white px-6 py-2 rounded-[2px] w-[200px] flex justify-center">
                    Registrarme
                </button>
                </div>
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