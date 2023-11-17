import { useContext } from "react";
import invest from "../../assets/images/Invest.jpg";
import { BookmarkCheck } from "react-bootstrap-icons";
import { HouseFill } from "react-bootstrap-icons";
import { StopwatchFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
const Invest = () => {
  const { myUser, authUser } = useContext(UserContext);
  return (
    <div className="container py-4">
      <div className="row py-4">
        <div className="col-md-6 text-center text-md-end order-1 order-md-0 ">
          <h2 className="mb-3">هل انت مبدع؟</h2>
          <h2 className="mb-5">استثمر مواهبك!</h2>
          <div className="d-flex align-items-center mb-4">
            <HouseFill size={25} />
            <p className="mb-0 me-2">منصة مخصصة للأعمال اليدوية</p>
          </div>
          <div className="d-flex align-items-center mb-4">
            <StopwatchFill size={25} className="align-self-start" />
            <p className="mb-0 me-2 text-end">
              نهتم بكل شيء بدءََ من استلام الطلب وحتى الشحن والتعامل مع
              المدفوعات وخدمة العملاء
            </p>
          </div>
          <div className="d-flex align-items-center mb-5">
            <BookmarkCheck size={25} className=" align-self-start" />
            <p className="mb-0 me-2 text-end">
              قم بانشاء حساب خاص بك واعرض منتجاتك بدون أي رسوم
            </p>
          </div>

          {/* <Link
            to={
              myUser && authUser && authUser[0].Rule == "seller"
                ? `/seller/profile`
                : `/register`
            }
            className="btn btn-primary fw-bold px-4 py-2 mb-4 mb-md-0"
          >
            ابدأ البيع
          </Link> */}
        </div>
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="h-100">
            <img src={invest} alt="" className="h-100"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invest;
