import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocs, query, where } from "firebase/firestore";
import { productsCollRef } from "../../firebase/firebase";
import ProductCard from "../../components/ProductCard/ProductCard";
import { SortComponent } from "../../components/SortComponent/SortComponent";
import { Spinner } from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";

const SearchPage = () => {
  const [products, setProducts] = useState<any>([]);
  const [filterdProducts, setFilterdProducts] = useState<any>([]);
  const { word } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemOffset, setItemOffset] = useState(0);

  // console.log(word);

  const searchDocuments = async (keyword: any) => {
    try {
      setLoading(true);
      setError(null);
      setItemOffset(0);

      const q = query(
        productsCollRef,
        where("productTitle", ">=", keyword),
        where("productTitle", "<=", keyword + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => doc.data());

      setFilterdProducts(documents);
    } catch (error) {
      setError("Error searching documents");
    }
    setLoading(false);
  };
  useEffect(() => {
    searchDocuments(word ? word : "");
  }, [word]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center mt-4">
          <Spinner />
        </div>
      ) : error ? (
        <h4>{error}</h4>
      ) : filterdProducts && filterdProducts.length > 0 ? (
        <div className="container mt-5">
          <div className="w-25">
            <SortComponent products={products} setProducts={setProducts} />
          </div>
          <div>
            <div className="row my-5 g-3">
              {products.map((prod: any) => (
                <div key={prod.productId} className="col-6 col-md-6 col-lg-3">
                  <ProductCard data={prod} />
                </div>
              ))}
            </div>
            <Pagination
              itemOffset={itemOffset}
              setItemOffset={setItemOffset}
              filterdProducts={filterdProducts}
              setProducts={setProducts}
            />
          </div>
        </div>
      ) : (
        <div className="container mt-5 vh-100">
          <h4>عذرا لا يوجد نتائج</h4>
        </div>
      )}
    </>
  );
};

export default SearchPage;
