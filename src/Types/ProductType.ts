export type ProductType = {
  id: string;
  productTitle: string;
  productPrice: string;
  productDescription: string;
  brand: string;
  productCategory: {
    value: string;
    label: string;
  };
  productImages: { imgId: string; imgUrl: string }[];
  generatedAt: object;
  discount: string;
};
