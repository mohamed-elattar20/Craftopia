import { useContext } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { UserContext } from "../../../Contexts/UserContext";
import { ProductType } from "../../../Types/ProductType";

const UserProfileWishList = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="row g-3">
      {currentUser &&
        Object.values(currentUser.wishList).length > 0 &&
        Object.values(currentUser.wishList).map((prod: any) => (
          <div className="col-6 col-md-6 col-lg-4" key={prod.productId}>
            <ProductCard data={prod} />
          </div>
        ))}
    </div>
  );
};

export default UserProfileWishList;
