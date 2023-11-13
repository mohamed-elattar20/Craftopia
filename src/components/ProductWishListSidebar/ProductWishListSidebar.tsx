//  Routing
import { NavLink } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { WishListIcon } from "../WishListIcon/WishListIcon";

const ProductWishListSidebar = ({ data }: DocumentData) => {
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
                alt=""
              />
            </NavLink>
          </div>
          <div className="col-6">
            <p
              style={{
                height: "48px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data?.productTitle}
            </p>
          </div>
          <div className="text-start col-2">
            <WishListIcon data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductWishListSidebar;
