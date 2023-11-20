import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const OrderDone = () => {
  return (
    <div className="container my-5 text-center">
      <h4 className="d-flex justify-content-center align-items-center gap-2">
        {" "}
        تم إتمام الطلب بنجاح
        <FontAwesomeIcon icon={faCheck} />
      </h4>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to={"/store"} className="btn btn-secondary">
          مواصلة التسوق
        </Link>
        <Link to={"/user/profile/orders"} className="btn btn-outline-secondary">
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
};
