import { DocumentData } from "firebase/firestore";
import candles from "../../assets/images/Categories/candles.png";
import AddQuantityToProduct from "../AddQuantityToProduct/AddQuantityToProduct";
import { Link, NavLink } from "react-router-dom";

type ProductCartSidebarProps = {
  data?: DocumentData;
};
const ProductCartSidebar = ({ data }: ProductCartSidebarProps) => {
  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-4">
            <NavLink
              to={{ pathname: `/product-details/${data?.productId}` }}
              state={{ data }}
            >
              <img
                style={{ display: "block" }}
                className="img-fluid w-100"
                src={data?.productImages[0].imgUrl}
                // src={candles}
                alt=""
              />
            </NavLink>
          </div>
          <div className="col-8">
            <p
              style={{
                height: "24px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data?.productTitle}
              {/* كوفية كروشية من خيط مستورد صناعة يدوية عالية الجودة والكفاءة */}
            </p>
            {/* <div className=""> */}
            <AddQuantityToProduct data={data} />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCartSidebar;
