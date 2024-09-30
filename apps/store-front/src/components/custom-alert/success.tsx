import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface CustomSuccessAlertProps {
  desc?: string;
}

const CustomSuccessAlert: React.FC<CustomSuccessAlertProps> = ({
  desc = "Successful",
}) => {
  return (
    <Alert className="border-green-500 bg-green-50 text-green-800">
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>{desc}</AlertDescription>
    </Alert>
  );
};

export default CustomSuccessAlert;
