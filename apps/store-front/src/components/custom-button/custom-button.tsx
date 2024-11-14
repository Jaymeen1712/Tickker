import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button, ButtonProps } from "../ui/button";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  loading,
  children,
  ...rest
}) => {
  return (
    <Button disabled={loading} {...rest}>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" size={15} />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default CustomButton;
