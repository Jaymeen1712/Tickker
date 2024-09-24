"use client";
import { Product } from "@prisma/client";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Use icons for buttons
import Slider from "react-slick";
import CarouselSingleContainer from "../carousel-single-container";
import CustomButton from "../custom-button";
import useCarouselWithTitleCompController from "./comp-controller";
import "./comp.css";

interface CarouselWithTitleProps {
  title: string | React.ReactNode;
  products: Product[];
}

const CarouselWithTitle: React.FC<CarouselWithTitleProps> = ({
  products,
  title,
}) => {
  const {
    handlePrevClick,
    handleNextClick,
    settings,
    sliderRef,
    currentSlide,
    totalSlides,
  } = useCarouselWithTitleCompController({ products });

  return (
    <div className="container">
      <div className="my-6 flex items-center justify-between border-b border-b-gray-400 py-6 text-xl font-semibold">
        {title}
        <div className="flex gap-4">
          <CustomButton
            onClick={handlePrevClick}
            className="carousel-btn"
            disabled={currentSlide === 0}
          >
            <FaArrowLeft />
          </CustomButton>
          <CustomButton
            onClick={handleNextClick}
            className="carousel-btn"
            disabled={currentSlide === totalSlides}
          >
            <FaArrowRight />
          </CustomButton>
        </div>
      </div>

      <div className="slider-container">
        <Slider
          {...settings}
          ref={sliderRef}
        >
          {products.map((product, index) => (
            <CarouselSingleContainer key={index} product={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarouselWithTitle;
