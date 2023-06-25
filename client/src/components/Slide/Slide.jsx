/** @format */

import React from 'react';
import './Slide.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Slide({children, amount = 4}) {
   var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: amount,
      slidesToScroll: 5,
      arrows: true,
   };
   return (
      <div className='slide'>
         <div className='container'>
            <Slider {...settings}>{children}</Slider>
         </div>
      </div>
   );
}
