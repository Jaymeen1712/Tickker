"use client";
import { CustomButton, CustomSlider } from "@/components";
import { Product } from "@prisma/client";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Use icons for buttons
import CarouselSingleContainer from "../carousel-single-container";
import useCarouselWithTitleCompController from "./comp-controller";

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
    setHandlePrevClick,
    handleNextClick,
    setHandleNextClick,
    isPrevDisable,
    setIsPrevDisable,
    isNextDisable,
    setIsNextDisable,
  } = useCarouselWithTitleCompController();

  return (
    <div className="container">
      <div className="my-6 flex items-center justify-between border-b border-b-gray-400 py-6 text-xl font-semibold">
        {title}
        <div className="flex gap-4">
          <CustomButton
            onClick={() => handlePrevClick()}
            className="carousel-btn"
            disabled={isPrevDisable}
          >
            <FaArrowLeft />
          </CustomButton>
          <CustomButton
            onClick={() => handleNextClick()}
            className="carousel-btn"
            disabled={isNextDisable}
          >
            <FaArrowRight />
          </CustomButton>
        </div>
      </div>

      <CustomSlider
        itemsLength={products.length}
        setHandlePrevClick={setHandlePrevClick}
        setHandleNextClick={setHandleNextClick}
        setIsPrevDisable={setIsPrevDisable}
        setIsNextDisable={setIsNextDisable}
      >
        {products.map((product, index) => (
          <CarouselSingleContainer key={index} product={product} />
        ))}
      </CustomSlider>
    </div>
  );
};

export default CarouselWithTitle;
