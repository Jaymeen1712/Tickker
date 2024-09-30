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
      <div className="bg-white px-8 py-6 shadow-md">
        <div className="flex items-center justify-between border-b border-b-gray-3 pb-6">
          <span className="text-xl font-semibold">{title}</span>
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

        <div className="mt-6">
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
      </div>
    </div>
  );
};

export default CarouselWithTitle;
