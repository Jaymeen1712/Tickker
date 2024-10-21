import React from "react";
import CustomTooltip, {
  CustomTooltipProps,
} from "../custom-tooltip/custom-tooltip";

interface CustomHeaderWithTooltipProps extends CustomTooltipProps {
  header: string;
}

const CustomHeaderWithTooltip: React.FC<CustomHeaderWithTooltipProps> = ({
  content,
  header,
  customIcon,
}) => {
  return (
    <div className="mb-4 flex items-center">
      <h1 className="text-lg font-semibold">{header}</h1>
      <CustomTooltip content={content} customIcon={customIcon} />
    </div>
  );
};

export default CustomHeaderWithTooltip;
