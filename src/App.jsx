import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './Views/Navbar/Navbar'
import { Inicio } from './Views/Inicio/Inicio'
import { Productos } from './Views/Productos/Productos'
import { Informacion } from './Views/Informacion/Informacion'
import { Footer } from '../src/Components/Footer/Footer'
import { Contacto } from './Views/Contacto/Contacto'
import { Whatsapp } from './Components/Whatsapp/Whatsapp'
import { Login } from './Components/Login/Login'
import { Register } from './Components/Register/Register'
import { Carrito } from './Views/Carrito/Carrito'
import { Detail } from './Components/Detail/Detail'
import { MisCompras } from './Components/Mis compras/misCompras'
import { useEffect } from 'react'

function App() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Inicio></Inicio>}/>
      <Route path="/productos" element={<Productos></Productos>}/>
      <Route path="/preguntasfrecuentes" element={<Informacion></Informacion>}/>
      <Route path="/contacto" element={<Contacto></Contacto>}/>
      <Route path="/login" element={<Login></Login>}/>
      <Route path="/register" element={<Register></Register>}/>
      <Route path='/carritodecompras' element={<Carrito></Carrito>}/>
      <Route path="/productos/:id" element={<Detail></Detail>}/>
      <Route path="/miscompras" element={<MisCompras/>} />
    </Routes>
    <Whatsapp></Whatsapp>
    <Footer></Footer>
    </div>
  )
}

export default App
