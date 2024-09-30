import { useState } from "react";

const useHeaderController = () => {
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);

  return { isUserPopoverOpen, setIsUserPopoverOpen };
};

export default useHeaderController;
