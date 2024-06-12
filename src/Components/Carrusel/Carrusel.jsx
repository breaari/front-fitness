import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Carrusel = ()=> {
    const settings = {
        dots: false,
        infinite: true,
        speed: 6000,
        autoplay: true,
        autoplaySpeed: 0, // Cambia la velocidad del autoplay según tus preferencias
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: 'linear', 
        pauseOnHover: false, // Evita pausar el autoplay al pasar el mouse sobre el carrusel
        pauseOnFocus: false,
        rtl: true
      };
    
      return (
        <Slider {...settings} className="mt-[75px] mx-auto w-full shadow-md">
          <div className=" p-4 flex justify-center items-center">
            <h1 className="text-lg font-bold flex justify-center">ENVÍO GRATIS</h1>
            <p className='text-[12px] flex justify-center'>En compras superiores a $50.000,00 en Mar del Plata</p>
          </div>
          <div className=" p-4  flex justify-center items-center">
            <h1 className="text-lg font-bold  flex justify-center">COMPRA MAYORISTA</h1>
            <p className='text-[12px] flex justify-center'>En compras superiores a $200.000,00 se aplica descuento de 5% off</p>
          </div>
          <div className=" p-4 flex justify-center items-center">
            <h1 className="text-lg font-bold flex justify-center">15% OFF EN TODA LA TIENDA</h1>
            <p className='text-[12px] flex justify-center'>Abonando con transferencia</p>
          </div>
         
        </Slider>
      );
    };
    
