"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface QuantitySelectorProps {
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
  isBothButtonDisable?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  onQuantityChange,
  isBothButtonDisable,
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
    <div className="flex items-center space-x-4">
      <Button
        onClick={decreaseQuantity}
        disabled={quantity <= 1 || isBothButtonDisable}
      >
        -
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="w-16 text-center"
      />
      <Button onClick={increaseQuantity} disabled={isBothButtonDisable}>
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
