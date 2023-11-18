export type ImageObj = {
  imgId: string;
  imgUrl: any;
  imgFile?: File;
};

export type ProductType = {
  productId: string;
  productTitle: string;
  productPrice: string;
  productDescription: string;
  brand: string;
  productCategory: {
    value: string;
    label: string;
  } | null;
  productImages: ImageObj[];
  generatedAt: object;
  discount: string;
  productImage: any;
  rating: "";
  sellerId: "";
  reviewes: [];
};
