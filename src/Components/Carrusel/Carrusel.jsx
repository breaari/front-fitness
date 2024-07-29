import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Leyenda } from './leyenda';
import { Leyenda2 } from './leyenda2';
import { Leyenda3 } from './leyenda3';
import { Leyenda4 } from './leyenda4';

export const Carrusel = () => {
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 980) {
                setSlidesToShow(1);
            } else {
                setSlidesToShow(3);
            }
        };

        handleResize(); // Check on mount
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        autoplay: true,
        autoplaySpeed: 0,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
        cssEase: 'linear',
        pauseOnHover: false,
        pauseOnFocus: false,
        rtl: false,
        variableWidth: true,
        centerMode: true,
    };

    return (
        <Slider {...settings} className="mt-[74px] mx-auto w-full h-24 shadow-md">
            <Leyenda />
            <Leyenda2 />
            <Leyenda3 />
            <Leyenda4 />
        </Slider>
    );
};

export default Carrusel;
