export type ImageObj = {
  imgId: string;
  imgUrl: any;
  imgFile?: File;
};

export type ProductType = {
  productId: string;
  productTitle: string;
  productPrice: number;
  productDescription: string;
  brand: string;
  productCategory: {
    value: string;
    label: string;
  } | null;
  productImages: ImageObj[];
  generatedAt: object;
  discount: number;
  productImage: any;
  rating: number;
  ratingCount: number;
  sellerId: "";
  reviewes: [];
  imgsNum: number;
  priceAfterDiscount: number;
  quantity: number;
};
