import { UploadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import Spinner from "../../../../admin/src/components/spinner";
import { Input, InputProps } from "../../../../admin/src/components/ui/input";

interface CustomInputAvatarProps {
  imgSrc: string | null | undefined;
  onImageChange: InputProps["onChange"];
  onImageDelete: () => void;
  isLoading?: boolean;
  name?: string | null;
}

const CustomInputAvatar: React.FC<CustomInputAvatarProps> = ({
  imgSrc,
  onImageChange,
  isLoading,
  name,
  onImageDelete,
}) => {
  const getInitials = (name: string | undefined | null) => {
    if (!name) return "";
    const splitName = name.split(" ");
    const firstInitial = splitName[0]?.charAt(0).toUpperCase();
    const lastInitial = splitName[1]?.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div className="relative h-[180px] w-[180px]">
      <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-50">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt=""
            objectFit="cover"
            className="rounded-full"
            fill
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50 text-5xl font-bold text-gray-700">
            {getInitials(name)}
          </div>
        )}

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
              {imgSrc && (
                <MdDelete
                  onClick={(e) => {
                    e.preventDefault();
                    onImageDelete();
                  }}
                  className="h-10 w-10 text-white opacity-0 transition-opacity duration-300 hover:text-red-600 group-hover:opacity-100"
                />
              )}
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
