import { Link } from "react-router-dom";
import test from "../../assets/images/default.jpg";
import "./Explore.css";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { postsCollRef } from "../../firebase/firebase";
const Explore = () => {
  const { myUser } = useContext(UserContext);

  return (
    <div className="container border-bottom py-4 ">
      <div className="row py-4">
        <div className="col-md-6 text-center text-md-end">
          <h2 className="mb-5">تبحث عن منتج ولم تجده؟</h2>
          <p className="mb-4 fs-5 ps-5">
            شارك منشورك على مجتمع كرافتوبيا بين الاف البائعين
          </p>
          <p className="mb-4 fs-5">سيقوم امهر عملائنا بتنفيذ رغباتك</p>
          <p className="mb-5 fs-5">تفاعل مع منشورات الاخرين</p>
          <Link
            to={myUser ? `/community` : `/login`}
            className="btn btn-secondary px-3 py-2  fw-bold  mb-5 mb-md-0"
          >
            استكشف
          </Link>
        </div>
        <div className="col-md-6 ">
          <div className="d-flex justify-content-end align-items-center">
            <p>Mai Alaa</p>
            <div className="userimg-wrapper me-4 h-auto">
              <img src={test} alt="" className=" rounded-circle "></img>
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

export default Explore;
