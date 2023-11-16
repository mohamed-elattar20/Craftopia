import { ProductType } from "../../Types/ProductType";

type ProductDetailsDescProps = {
  product: ProductType;
};

const ProductDetailsDesc = ({ product }: ProductDetailsDescProps) => {
  return (
    <>
      <div className="container ">
        <div className="row">
          <h3>
            الفئة :{" "}
            <span className="lead">{product.productCategory?.label}</span>
          </h3>
          <h3>وصف المنتج :</h3>
          <p className="lead">{product.productDescription}</p>
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
