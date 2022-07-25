import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Card from "../components/Card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../index.css";

export default function SimpleSlider() {
  useEffect(() => {
    console.log(window.innerWidth);
  }, [window.innerWidth]);
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={3}
        speed={500}
        loop={true}
        touchRatio={1.5}
        effect={"flip"}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="cards">
            <Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="cards">
            <Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="cards">
            <Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="cards">
            <Card />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="cards">
            <Card />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
