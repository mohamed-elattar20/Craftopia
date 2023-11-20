import { useContext } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { UserContext } from "../../../Contexts/UserContext";
import { ProductType } from "../../../Types/ProductType";
import { Link } from "react-router-dom";

const UserProfileWishList = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="row g-3">
      {currentUser && Object.values(currentUser.wishList).length > 0 ? (
        Object.values(currentUser.wishList).map((prod: any) => (
          <div className="col-12 col-sm-6 col-lg-4" key={prod.productId}>
            <ProductCard data={prod} />
          </div>
        ))
      ) : (
        <>
          <h3 className="display-5">لاتوجد منتجات مفضلة الآن</h3>
          <Link to={`/store`} className="btn btn-primary w-25">
            أضف منتجات
          </Link>
        </>
      )}
    </div>
  );
};

export default UserProfileWishList;
