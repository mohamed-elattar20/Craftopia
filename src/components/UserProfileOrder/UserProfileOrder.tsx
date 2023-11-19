import { ProductType } from "../../Types/ProductType";
import item from "../../assets/images/User Profile/product.jpeg";
import "./userProfileOrder.css";

type UserProfileOrderProps = {
  productOrder: ProductType;
  orderStatus: string;
};
export const UserProfileOrder = ({
  productOrder,
  orderStatus,
}: UserProfileOrderProps) => {
  // console.log(productOrder);

  return (
    <div className=" shadow-sm rouded-3 p-2 user-profile-order d-flex flex-column flex-sm-row gap-3 w-100 align-items-center align-items-sm-start">
      <div
        className="order-img w-25 rounded-3 order-2 order-sm-1 rounded-3"
        style={{ overflow: "hidden", minWidth: "80px", maxWidth: "200px" }}
      >
        <img src={productOrder.productImages[0].imgUrl} alt="" style={{}} />
      </div>
      <div className="order-1 order-sm-2 w-75 text-center text-sm-end">
        <h4 className="fs-5"> {productOrder.productTitle} </h4>
        <p className="">الكمية : {productOrder.quantity}</p>
        <p className="">سعر المنتج : EGP {productOrder.productPrice}</p>
      </div>

      <div
        className="align-self-sm-end text-center order-3"
        style={{ minWidth: "fit-content" }}
      >
        {orderStatus === "pending" ? (
          ""
        ) : (
          <button className="btn btn-secondary text-white"> إضافة تقييم</button>
        )}
      </div>
    </div>
  );
};
