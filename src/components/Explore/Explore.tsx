import test from "../../assets/images/default.jpg";
import "./Explore.css";
const explore = () => {
  return (
    <div className="container border-bottom py-4">
      <div className="row py-4 ">
        <div className="col-md-6 text-center text-md-end">
          <h2 className="mb-5">تبحث عن منتج ولم تجده؟</h2>
          <p className="mb-3 fs-5">
            شارك منشورك على مجتمع كرافتوبيا بين الاف البائعين
          </p>
          <p className="mb-5 fs-5">تفاعل مع منشورات الاخرين</p>
          <button className="btn btn-primary  fs-5 fw-bold px-4 py-3 mb-5 mb-md-0">
            استكشف
          </button>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end align-items-center">
            <p>Mai Alaa</p>
            <div className="userimg-wrapper me-4">
              <img src={test} alt="" className="h-100 rounded-circle"></img>
            </div>
          </div>
          <p className="fs-4">في حد ممكن يعملي الشنطة دي؟</p>
          <div>
            <img src={test} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default explore;
