"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Slider, { Settings } from "react-slick";

interface CustomSliderController {
  itemsLength: number;
  setHandlePrevClick?: React.Dispatch<React.SetStateAction<() => void>>;
  setHandleNextClick?: React.Dispatch<React.SetStateAction<() => void>>;
  setIsPrevDisable?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNextDisable?: React.Dispatch<React.SetStateAction<boolean>>;
  responsiveConfig?: {
    480: number;
    600: number;
    1024: number;
    any: number;
  };
}

const useCustomSliderController = ({
  itemsLength,
  setHandleNextClick,
  setHandlePrevClick,
  setIsNextDisable,
  setIsPrevDisable,
  responsiveConfig = {
    "1024": 3,
    "480": 1,
    "600": 2,
    any: 4,
  },
}: CustomSliderController) => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(responsiveConfig.any);

  const totalSlides = useMemo(
    () => Math.ceil(itemsLength - slidesToShow),
    [itemsLength, slidesToShow],
  );

  const handleSliderAfterChange = (current: number) => {
    setCurrentSlide(current);
  };

  const updateSlidesToShow = useCallback(
    (width: number) => {
      if (width < 480) {
        setSlidesToShow(responsiveConfig["480"]);
      } else if (width < 600) {
        setSlidesToShow(responsiveConfig["600"]);
      } else if (width < 1024) {
        setSlidesToShow(responsiveConfig["1024"]);
      } else {
        setSlidesToShow(responsiveConfig["any"]);
      }
    },
    [responsiveConfig],
  );

  useEffect(() => {
    if (sliderRef.current) {
      setHandlePrevClick?.(() => sliderRef.current?.slickPrev);
      setHandleNextClick?.(() => sliderRef.current?.slickNext);
    }
  }, [setHandleNextClick, setHandlePrevClick]);

  useEffect(() => {
    setIsNextDisable?.(currentSlide >= totalSlides);
    setIsPrevDisable?.(currentSlide === 0);
  }, [currentSlide, setIsNextDisable, setIsPrevDisable, totalSlides]);

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

  const responsiveSettings = Object.keys(responsiveConfig)
    .filter((config) => config === "any")
    .map((breakpoint) => ({
      breakpoint: parseInt(breakpoint),
      settings: {
        slidesToShow: responsiveConfig[breakpoint],
        slidesToScroll: responsiveConfig[breakpoint],
      },
    }));

  const settings: Settings = {
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: 0,
    afterChange: handleSliderAfterChange,
    responsive: responsiveSettings,
  };

  return {
    settings,
    sliderRef,
    currentSlide,
    totalSlides,
  };
};

export default useCustomSliderController;
