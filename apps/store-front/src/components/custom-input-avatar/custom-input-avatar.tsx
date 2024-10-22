import { UploadIcon } from "@radix-ui/react-icons";
import Spinner from "../../../../admin/src/components/spinner";
import { Input } from "../../../../admin/src/components/ui/input";

interface CustomInputAvatarProps {
  imgSrc: string;
  onImageChange: () => void;
  isLoading?: boolean;
}

const CustomInputAvatar: React.FC<CustomInputAvatarProps> = ({
  imgSrc,
  onImageChange,
  isLoading,
}) => {
  return (
    <div className="relative h-[180px] w-[180px] overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
      <div className="relative flex h-full w-full items-center justify-center">
        <img
          src={imgSrc}
          alt="Profile img"
          className="h-full w-full object-cover"
        />

        {/* Overlay with upload icon on hover */}
        <label
          htmlFor="dropzone-file"
          className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-0 transition-all duration-300 hover:bg-opacity-50"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <UploadIcon className="h-10 w-10 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Input
                type="file"
                accept="image/*"
                id="dropzone-file"
                className="hidden"
                onChange={onImageChange}
              />
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default CustomInputAvatar;
