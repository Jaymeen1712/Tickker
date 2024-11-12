import { cn } from "@/lib/utils";

interface CustomKeyValuePairProps {
  label: string;
  value: string | number | undefined | null;
  className?: string;
  labelClassName?: string;
  isDashVisible?: boolean;
}

const CustomLabelValuePair: React.FC<CustomKeyValuePairProps> = ({
  label,
  value,
  className,
  labelClassName,
  isDashVisible = true,
}) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("font-semibold opacity-50", labelClassName)}>
        {label} {isDashVisible && "-"}{" "}
      </div>
      <div>{value}</div>
    </div>
  );
};

export default CustomLabelValuePair;
