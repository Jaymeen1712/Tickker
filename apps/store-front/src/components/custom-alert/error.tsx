import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface CustomErrorAlertProps {
  title?: string;
  desc?: string;
}

const CustomErrorAlert: React.FC<CustomErrorAlertProps> = ({
  title,
  desc = "An unknown error occurred!",
}) => {
  return (
    <Alert variant="destructive" className="bg-red-50">
      {title && <AlertTitle>Error</AlertTitle>}
      <AlertDescription>{desc}</AlertDescription>
    </Alert>
  );
};

export default CustomErrorAlert;
