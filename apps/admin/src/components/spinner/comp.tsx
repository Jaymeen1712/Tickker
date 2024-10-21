import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { LuLoader2 } from "react-icons/lu";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
  containerClassName?: string;
}

export default function Spinner({
  size,
  show,
  children,
  className,
  containerClassName,
}: SpinnerContentProps) {
  return (
    <div className={cn(spinnerVariants({ show }), containerClassName)}>
      <LuLoader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </div>
  );
}
