import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CustomAvatar = ({
  src = "https://github.com/shadcn.png",
}: {
  src?: string;
}) => {
  return (
    <Avatar className="h-full w-full cursor-pointer">
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
