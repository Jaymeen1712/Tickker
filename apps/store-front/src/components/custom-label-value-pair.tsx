import { cn } from "@/lib/utils";

interface CustomKeyValuePairProps {
  label: string;
  value: string | number | undefined | null;
  className?: string;
}

const CustomLabelValuePair: React.FC<CustomKeyValuePairProps> = ({
  label,
  value,
  className,
}) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="font-semibold opacity-50">{label} - </div>
      <div>{value}</div>
    </div>
  );
};

export default CustomLabelValuePair;
