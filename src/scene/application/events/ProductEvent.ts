export const PRODUCT_EVENT_CHANNEL = "product";

export type ProductEvent = LoadProductEvent | RemoveProductEvent;

type LoadProductEvent = {
  action: "LOAD_PRODUCT";
  productId: string;
};

type RemoveProductEvent = {
  action: "REMOVE_PRODUCT";
  productId: string;
};
