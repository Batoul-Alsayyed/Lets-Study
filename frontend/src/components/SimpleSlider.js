import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../components/Card";
import "../index.css";
export default function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]}
  return (
    <Slider {...settings}>
        <div className="cards"><Card /></div>
        <div className="cards"><Card /></div>
        <div className="cards"><Card /></div>
        <div className="cards"><Card /></div>
        <div className="cards"><Card /></div>
        <div className="cards"><Card /></div>
        <div className="cards"><Card /></div>
        <div className="cards"><Card /></div>

    </Slider>
  );
}
