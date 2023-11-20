import { useContext } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { UserContext } from "../../../Contexts/UserContext";
import { ProductType } from "../../../Types/ProductType";
import { Link } from "react-router-dom";

const UserProfileWishList = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser && Object.values(currentUser.wishList).length > 0 ? (
        <div className="row g-3">
          {Object.values(currentUser.wishList).map((prod: any) => (
            <div className="col-12 col-sm-6 col-lg-4" key={prod.productId}>
              <ProductCard data={prod} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="fs-3 fw-normal mb-3">لاتوجد منتجات مفضلة الآن</h2>
          <Link
            to={`/store`}
            className="btn btn-secondary"
            style={{ width: "fit-content" }}
          >
            أضف منتجات
          </Link>
        </div>
      )}
    </>
  );
};

export default UserProfileWishList;
