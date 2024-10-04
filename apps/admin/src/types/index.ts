export * from "./request-obj";

export type CommonOmitType = "id" | "createdAt" | "updatedAt";
export interface CarouselSingleProductType {
  image: string[];
  name: string;
  desc?: string;
  price: string | number;
  brand?: string;
}
