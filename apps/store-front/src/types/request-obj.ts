export interface CreateCartRequestObjType {
  profileId: string;
}

export interface CreateCartItemRequestObjType {
  productId: string;
  cartId: string;
  quantity: number;
}

export interface FetchProfileByUserIdRequestObjType {
  userId: string;
}
