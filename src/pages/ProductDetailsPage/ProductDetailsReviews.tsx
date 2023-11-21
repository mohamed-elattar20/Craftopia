import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { ProductType } from "../../Types/ProductType";

type ProductDetailsReviewsProps = {
  product: ProductType;
};

const ProductDetailsReviews = ({ product }: ProductDetailsReviewsProps) => {
  return (
    <>
      <div className="container ">
        <div className="row my-4">
          {product.reviewes.length !== 0 ? (
            product.reviewes.map((rev) => (
              <div key={rev.reviewId} className="col-12 my-2">
                <ReviewCard review={rev} />
              </div>
            ))
          ) : (
            <h3 className="fs-4 fw-normal">لايوجد تقييمات لهذا المنتج </h3>
          )}
          {/* {product.reviewes.map((rev, index) => (
            <div key={index} className="col-12 my-2">
              <ReviewCard review={rev} />
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsReviews;
