import { cn } from "@/lib/utils";
import React from "react";
import CustomTooltip, {
  CustomTooltipProps,
} from "../custom-tooltip/custom-tooltip";

interface CustomHeaderWithTooltipProps extends CustomTooltipProps {
  header: string;
  mainContainerClassName?: string;
}

const CustomHeaderWithTooltip: React.FC<CustomHeaderWithTooltipProps> = ({
  content,
  header,
  customIcon,
  mainContainerClassName,
}) => {
  return (
    <div className={cn("mb-4 flex items-center", mainContainerClassName)}>
      <h1 className="text-lg font-semibold">{header}</h1>
      <CustomTooltip content={content} customIcon={customIcon} />
    </div>
  );
};

export default CustomHeaderWithTooltip;
