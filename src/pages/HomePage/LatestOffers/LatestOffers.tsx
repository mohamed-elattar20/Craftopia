import { useCollectionData } from "react-firebase-hooks/firestore";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { productsColRef } from "../../../firebase/firebase.config";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "../../../components/Spinner/Spinner";

const LatestOffers = () => {
  const [products, loading, error] = useCollectionData(productsColRef);
  const [sortedOffers, setSortedOffers] = useState<Array<DocumentData>>([]);

  useEffect(() => {
    const offers = products?.filter((pro) => pro.discount > 0);
    const sortedOff = offers?.sort((a: any, b: any) =>
      +b.discount - +a.discount === 0
        ? a.generatedAt - b.generatedAt
        : +b.discount - +a.discount
    );
    sortedOff && setSortedOffers(sortedOff?.slice(0, 4));
  }, [products]);

  return (
    <>
      <section>
        <div className="container py-5 border-bottom">
          <div className="row text-center g-3">
            <h2 className="display-5">عروض اليوم</h2>
            {/* <p className="my-2 lead">خصومات تصل الى 30%</p> */}
            <Link
              to={"/store"}
              className="mt-1 mb-3 d-flex align-items-center justify-content-center gap-2"
            >
              <span> استكشف جميع العروض</span>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </Link>
            {error && <p>{error.message}</p>}
            {loading && (
              <div className="d-flex justify-content-center mt-4">
                <Spinner />
              </div>
            )}
            {sortedOffers?.map((product) => (
              <div
                className="col-12 col-sm-6 col-lg-3"
                key={product?.productId}
              >
                <ProductCard data={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestOffers;
