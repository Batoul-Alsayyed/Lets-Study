import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Card from "./Card";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../index.css";

export default function SimpleSlider({ studentsarray }) {
  // useEffect(() => {
  //   console.log(window.innerWidth);
  // }, [window.innerWidth]);
  useEffect(() => {
    if (studentsarray) {
      console.log("students inside simple slider", { studentsarray });
    }
  }, []);

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        speed={500}
        loop={true}
        touchRatio={1.5}
        effect={"flip"}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {studentsarray &&
          studentsarray.map((i, index) => {
            return (
              <div>
                <SwiperSlide key={index}>
                  <div className="cards">
                    <Card
                      student={studentsarray[index]}
                      student_rate_number={studentsarray[index].rate_number}
                      student_latitude={studentsarray[index].latitude}
                      student_longitude={studentsarray[index].longitude}
                      student_image_link={studentsarray[index].image_link}
                      student_user_id={studentsarray[index].user_id}
                    />
                  </div>
                </SwiperSlide>
              </div>
            );
          })}
      </Swiper>
    </>
  );
}
