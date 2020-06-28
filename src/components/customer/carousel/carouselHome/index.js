import React from "react";
import Swiper from "react-id-swiper";
import slide1 from "../../../../assets/image/giay.jpg";
import slide2 from "../../../../assets/image/slide2.jpg";
import slide3 from "../../../../assets/image/slide3.jpg";
import slide4 from "../../../../assets/image/slide4.jpg";
import slide5 from "../../../../assets/image/slide5.jpg";

import "./style.css";

function CarouselHome() {
  const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    containerClass: 'container-swiper',
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev"
    // }
  };
  return (
    <div >
      <Swiper {...params}   >
        <div >
          <img className="image" src={slide1}></img>
        </div>
        <div  >
          <img className="image" src={slide2}></img>
        </div>
        <div  >
          <img className="image" src={slide3}></img>
        </div>
        <div  >
          <img className="image" src={slide4}></img>
        </div>
        <div  >
          <img className="image" src={slide5}></img>
        </div>
      </Swiper>
    </div>
  );
}

export default CarouselHome;
