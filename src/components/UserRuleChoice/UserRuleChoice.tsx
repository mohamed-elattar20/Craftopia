import { useNavigate } from "react-router";

const UserRuleChoice = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container my-5">
        <div className="row g-3 justify-content-center text-center">
          <h1 className="display-3 my-5">إنشاء حساب ك...</h1>
          <div className="col-12 col-lg-6 ">
            <button
              onClick={() => navigate(`/register/buyer`)}
              className="bg-secondary p-5 rounded-3 border-0 text-light w-100"
            >
              <h2 className=" pt-2 pt-md-3 pt-lg-5 pb-3 pb-md-2 fw-bold">
                مشتري
              </h2>
              <h3 className="pb-5 pb-md-3 pb-lg-5 fw-light">
                أريد أن اشتري المنتجات
              </h3>
            </button>
          </div>
          <div className="col-12 col-lg-6 ">
            <button
              onClick={() => navigate(`/register/seller`)}
              className="bg-secondary p-5 rounded-3 border-0 text-light w-100 "
            >
              <h2 className=" pt-2 pt-md-3 pt-lg-5 pb-3 pb-md-2 fw-bold px-5">
                بائع
              </h2>
              <h3 className="pb-5 pb-md-3 pb-lg-5 fw-light px-5">
                {" "}
                أريد ان أعرض منتجاتي
              </h3>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRuleChoice;
