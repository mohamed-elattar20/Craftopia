import item from "../../assets/images/User Profile/product.jpeg";
import "./userProfileOrder.css";

export const UserProfileOrder = () => {
  return (
    <div className="user-profile-order d-flex flex-column flex-sm-row gap-3 w-100 align-items-center align-items-sm-start">
      <div
        className="order-img w-25 rounded-3 order-2 order-sm-1 rounded-3"
        style={{ overflow: "hidden", minWidth: "80px", maxWidth: "200px" }}
      >
        <img src={item} alt="" style={{}} />
      </div>
      <div className="order-1 order-sm-2 w-75 text-center text-sm-end">
        <h4 className="fs-5">كوفيه كروشيه - صناعة يدوية</h4>
        <p>تم التوصيل</p>
      </div>

      <div
        className="align-self-sm-end text-center order-3"
        style={{ minWidth: "fit-content" }}
      >
        <button className="btn btn-secondary text-white">عرض التفاصيل</button>
      </div>
    </div>
  );
};
