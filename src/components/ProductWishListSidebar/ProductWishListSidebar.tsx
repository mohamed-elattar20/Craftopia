//  Routing
import { Link } from "react-router-dom";
// Assets
import candles from "../../assets/images/Categories/candles.png";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const ProductWishListSidebar = () => {
  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-4">
            {/* <Link to={`/product-details/${data?.productId}`}> */}
            <img
              style={{ display: "block" }}
              className="img-fluid w-100"
              // src={data?.productImages[0].imgUrl}
              src={candles}
              alt=""
            />
            {/* </Link> */}
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
              {/* {data?.productTitle} */}
              كوفية كروشية من خيط مستورد صناعة يدوية عالية الجودة والكفاءة
            </p>
            {/* Add To WishList Functionality */}
            <div className="text-start">
              <button className="btn">
                <FontAwesomeIcon className="text-warning fs-5" icon={faHeart} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductWishListSidebar;
