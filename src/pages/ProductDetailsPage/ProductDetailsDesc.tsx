import { ProductType } from "../../Types/ProductType";

type ProductDetailsDescProps = {
  product: ProductType;
};

const ProductDetailsDesc = ({ product }: ProductDetailsDescProps) => {
  return (
    <>
      <div className="container ">
        <div className="row ">
          <h3 className="fs-4">
            الفئة :{" "}
            <span className="lead">{product.productCategory?.label}</span>
          </h3>
          <div className="">
            <h3 className="fs-4" style={{ minWidth: "fit-content" }}>
              وصف المنتج :
            </h3>
            <p className="lead">{product.productDescription}</p>
          </div>

          {/* <ul className="lead">
            <li>تتميز الشنطة بتصميم مميز جدا وعصري يجعل منها اختيار مميز</li>
            <li>تتميز الشنطة بتصميم مميز جدا وعصري يجعل منها اختيار مميز</li>
            <li>تتميز الشنطة بتصميم مميز جدا وعصري يجعل منها اختيار مميز</li>
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsDesc;
