import { Product } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";

interface CarouselWithTitleCompController {
  products: Product[];
}

const useCarouselWithTitleCompController = ({
  products,
}: CarouselWithTitleCompController) => {
  const sliderRef = React.useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const totalSlides = Math.ceil(products.length - slidesToShow);

  const handlePrevClick = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current?.slickNext();
  };

  const handleSliderAfterChange = (current: number) => {
    setCurrentSlide(current);
  };

  const updateSlidesToShow = useCallback((width: number) => {
    if (width < 480) {
      setSlidesToShow(1);
    } else if (width < 600) {
      setSlidesToShow(2);
    } else if (width < 1024) {
      setSlidesToShow(3);
    } else {
      setSlidesToShow(4);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      updateSlidesToShow(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Initial setup
    updateSlidesToShow(window.innerWidth);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateSlidesToShow]);

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: 0,
    afterChange: handleSliderAfterChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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

  return {
    handlePrevClick,
    handleNextClick,
    settings,
    sliderRef,
    currentSlide,
    totalSlides,
  };
};

export default useCarouselWithTitleCompController;
