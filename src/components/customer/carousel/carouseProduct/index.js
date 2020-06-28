/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import slide1 from "../../../../assets/image/slide1.jpg";
import "./style.css";

function CarouselProduct(props) {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  };
  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: "auto",
    touchRatio: 0.2,
    slideToClickedSlide: true
  };
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  const renderParent = () => {
    let result = [];
    if (props.imgs && props.imgs.length > 0) {
      props.imgs.map((item, index) => {
        return (
          <div className="swiper-slide" key={index}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={`http://localhost:1337/images/temp/${item}`}
            />
          </div>
        );
      });
    }
    return result;
  };

  const renderChildren = () => {
    let result = [];
    console.log("img", props.imgs);
    if (props.imgs && props.imgs.length > 0) {
      props.imgs.map((item, index) => {
        console.log("test n", `http://localhost:1337/images/temp/${item}`);
        return (
          <img
            className="slide-under swiper-slide "
            src={`http://localhost:1337/images/temp/${item}`}
            key={index}
          />
        );
      });
    }
    return result;
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <Swiper {...gallerySwiperParams}>
        <div className="swiper-slide">
          <img
            style={{ width: "100%", height: "100%" }}
            src={
              props.imgs && props.imgs[0]
                ? `http://localhost:1337/images/temp/${props.imgs[0]}`
                : slide1
            }
          />
        </div>
        <div className="swiper-slide">
          <img
            style={{ width: "100%", height: "100%" }}
            src={
              props.imgs && props.imgs[1]
                ? `http://localhost:1337/images/temp/${props.imgs[1]}`
                : slide1
            }
          />
        </div>
        <div className="swiper-slide">
          <img
            style={{ width: "100%", height: "100%" }}
            src={
              props.imgs && props.imgs[2]
                ? `http://localhost:1337/images/temp/${props.imgs[2]}`
                : slide1
            }
          />
        </div>
        <div className="swiper-slide">
          <img
            style={{ width: "100%", height: "100%" }}
            src={
              props.imgs && props.imgs[3]
                ? `http://localhost:1337/images/temp/${props.imgs[3]}`
                : slide1
            }
          />
        </div>
        <div className="swiper-slide">
          <img
            style={{ width: "100%", height: "100%" }}
            src={
              props.imgs && props.imgs[4]
                ? `http://localhost:1337/images/temp/${props.imgs[4]}`
                : slide1
            }
          />
        </div>
        {/* {renderParent()} */}
      </Swiper>

      <div style={{ height: "120px" }}>
        <Swiper {...thumbnailSwiperParams}>
          <img
            className="slide-under swiper-slide "
            src={
              props.imgs && props.imgs[0]
                ? `http://localhost:1337/images/temp/${props.imgs[0]}`
                : slide1
            }
          />

          <img
            className="slide-under swiper-slide "
            src={
              props.imgs && props.imgs[1]
                ? `http://localhost:1337/images/temp/${props.imgs[1]}`
                : slide1
            }
          />

          <img
            className="slide-under swiper-slide "
            src={
              props.imgs && props.imgs[2]
                ? `http://localhost:1337/images/temp/${props.imgs[2]}`
                : slide1
            }
          />

          <img
            className="slide-under swiper-slide "
            src={
              props.imgs && props.imgs[3]
                ? `http://localhost:1337/images/temp/${props.imgs[3]}`
                : slide1
            }
          />

          <img
            className="slide-under swiper-slide "
            src={
              props.imgs && props.imgs[4]
                ? `http://localhost:1337/images/temp/${props.imgs[4]}`
                : slide1
            }
          />
          {/* {renderChildren()} */}
        </Swiper>
      </div>
    </div>
  );
}

export default CarouselProduct;
