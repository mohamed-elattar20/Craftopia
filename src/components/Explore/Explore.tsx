import { Link } from "react-router-dom";
import explore from "../../assets/images/explore.png";
import "./Explore.css";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
const Explore = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <section>
      <div className="container py-5 border-bottom ">
        <div className="row justify-content-between">
          <div className="col-md-6 text-center text-md-end">
            <h2 className="mb-5">تبحث عن منتج ولم تجده؟</h2>
            <p className="mb-4 fs-5 ps-5">
              شارك منشورك على مجتمع كرافتوبيا بين الاف البائعين
            </p>
            <p className="mb-4 fs-5">سيقوم امهر عملائنا بتنفيذ رغباتك</p>
            <p className="mb-5 fs-5">تفاعل مع منشورات الاخرين</p>
            <Link
              to={currentUser ? `/community` : `/login`}
              className="btn btn-secondary px-3 py-2  fw-bold  mb-5 mb-md-0"
            >
              استكشف
            </Link>
          </div>
          <div className="col-md-6 col-lg-5">
            <div>
              <img src={explore} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
