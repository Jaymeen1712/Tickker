import { useState } from "react";

const useCarouselWithTitleCompController = () => {
  const [handlePrevClick, setHandlePrevClick] = useState<() => void>(() => {});
  const [handleNextClick, setHandleNextClick] = useState<() => void>(() => {});
  const [isPrevDisable, setIsPrevDisable] = useState(false);
  const [isNextDisable, setIsNextDisable] = useState(false);

  return {
    handlePrevClick,
    setHandlePrevClick,
    handleNextClick,
    setHandleNextClick,
    isPrevDisable,
    setIsPrevDisable,
    isNextDisable,
    setIsNextDisable,
  };
};

export default useCarouselWithTitleCompController;
