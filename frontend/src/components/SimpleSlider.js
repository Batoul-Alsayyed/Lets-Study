import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../components/Card";
import "../index.css";
import { useNavigate } from "react-router-dom";

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let navigate = useNavigate();

  const onCardClick = (e) => {
    e.preventDefault();
    navigate("/student/:" + "id");
  };
  return (
    <Slider {...settings}>
      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>

      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>

      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>

      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>

      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>

      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>

      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>

      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>

      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>

      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>

      <div className="cards" onClick={onCardClick}>
        <Card />
      </div>
    </Slider>
  );
}
