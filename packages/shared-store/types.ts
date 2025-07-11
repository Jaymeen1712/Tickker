import { Profile } from "@prisma/client";

export interface BaseUtilsSlice {
  profile: Profile | undefined;
  setProfile: (data: Profile | undefined) => void;
  isLoading: boolean;
  setIsLoading: (data: boolean) => void;
}

export interface WatchSpecificProductFields {
  brand?: string;
  category?: string;
  strap?: string;
  buckle?: string;
  strapSize?: string;
  movement?: string;
  waterResistance?: string;
  caseMaterial?: string;
  caseDiameter?: string;
  dialColor?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface CommonSlice {
  productAdvanceFilters: WatchSpecificProductFields | undefined;
  setProductAdvanceFilters: (data: WatchSpecificProductFields | undefined) => void;
  resetProductAdvanceFilters: () => void;
}

export interface StoreConfig {
  name: string;
  partialize?: (state: any) => any;
  version?: number;
}
