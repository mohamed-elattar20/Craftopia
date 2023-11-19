import { query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { productsCollRef, usersCollRef } from "../../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Spinner } from "../../components/Spinner/Spinner";

//
const SellerProductsPage = () => {
  const { sellerId } = useParams();
  const sellerProductsFilterd = query(
    productsCollRef,
    where("sellerId", "==", sellerId)
  );
  const [sellerProducts, loading, error] = useCollectionData(
    sellerProductsFilterd
  );
  // console.log(sellerProducts);

  const sellerArr = query(usersCollRef, where("uId", "==", sellerId));
  const [sellerDoc] = useCollectionData(sellerArr);

  return (
    <>
      <div className="container my-5">
        {loading ? (
          <div className="h-100 d-flex justify-content-center">
            <Spinner />
          </div>
        ) : (
          <>
            <h1 className="display-6  my-4">
              إسم البائع : {sellerDoc && sellerDoc[0].displayName}
            </h1>
            <div className="row g-3">
              {sellerProducts?.map((product) => (
                <div className="col-6 col-md-4 col-lg-3">
                  <ProductCard data={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SellerProductsPage;
