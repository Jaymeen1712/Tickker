"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface QuantitySelectorProps {
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
  isBothButtonDisable?: boolean;
  decreaseButtonClassName?: string;
  increaseButtonClassName?: string;
  inputClassName?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  onQuantityChange,
  isBothButtonDisable,
  decreaseButtonClassName,
  increaseButtonClassName,
  inputClassName,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      if (onQuantityChange) onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(1, prevQuantity - 1);
      if (onQuantityChange) onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
      if (onQuantityChange) onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={decreaseQuantity}
        disabled={quantity <= 1 || isBothButtonDisable}
        className={cn("rounded-r-none", decreaseButtonClassName)}
      >
        -
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={handleChange}
        className={cn(
          "hide-input-number-arrows rounded-none text-center focus-visible:border-black focus-visible:ring-0",
          inputClassName,
        )}
      />
      <Button
        onClick={increaseQuantity}
        disabled={isBothButtonDisable}
        className={cn("rounded-l-none", increaseButtonClassName)}
      >
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
