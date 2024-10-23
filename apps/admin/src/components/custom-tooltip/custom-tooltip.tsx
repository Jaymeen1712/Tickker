import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { LuInfo } from "react-icons/lu";

export interface CustomTooltipProps {
  content: string;
  customIcon?: React.ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  content,
  customIcon,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="ml-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full">
            {customIcon ? (
              <>{customIcon}</>
            ) : (
              <LuInfo className="text-gray-600" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className="text-md rounded-md bg-black px-4 py-2 text-white shadow-lg"
        >
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
