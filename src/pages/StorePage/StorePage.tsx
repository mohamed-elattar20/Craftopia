import ProductCard from "../../components/ProductCard/ProductCard";
import { DocumentData, getDocs, query, where } from "firebase/firestore";
import { productsColRef } from "../../firebase/firebase.config";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { productsCollRef } from "../../firebase/firebase";
import { SortComponent } from "../../components/SortComponent/SortComponent";
// CSS
import "./StorePage.css";
import Pagination from "../../components/Pagination/Pagination";
import { Spinner } from "../../components/Spinner/Spinner";
const StorePage = () => {
  const [products, setProducts] = useState<Array<DocumentData>>([]);
  const location = useLocation();
  const [category, setCategory] = useState<string>(
    location.state ?? "كل الفئات"
  );
  const [itemOffset, setItemOffset] = useState(0);
  const [filterdProducts, setFilterdProducts] = useState<any>([]);
  const [productss] = useCollectionData(productsCollRef);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterQuery = (e: any) => {
    if (e.target.tagName === "BUTTON" && e.target.className.includes("cat")) {
      setCategory(e.target.innerText);
      setItemOffset(0);
    }
  };

  console.log(location.state);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const q = query(
      productsColRef,
      category
        ? where("productCategory.value", "==", category)
        : where("productTitle", ">", "")
    );
    const getQuery = async () => {
      const querySnapshot = await getDocs(q)
        .catch((er) => setError("حدث خطا ما برجاء المحاولة لاحقا"))
        .finally(() => setLoading(false));

      const queryProductsArray: Array<DocumentData> = [];
      querySnapshot &&
        querySnapshot.forEach((doc) => {
          queryProductsArray.push(doc.data());
        });
      if (productss && queryProductsArray.length === 0) {
        setFilterdProducts([...(productss as DocumentData[])]);
      } else {
        setFilterdProducts([...(queryProductsArray as any)]);
      }
    };

    getQuery();
  }, [category, productss]);

  const categories = [
    "كل الفئات",
    "تصميم",
    "مواد طبيعية",
    "مواد كيميائية",
    "خرز",
    "خيوط",
  ];

  return (
    <>
      {/* <div className="text-center mt-5 bg-primary text-light py-5">
        <h1 className="display-3 fw-medium mb-3">مرحبا بك في المتجر</h1>
        <h5 className="display-6 ">Store</h5>
      </div> */}
      <div className="container my-5">
        <div className="row justify-content-center text-center my-5">
          <h2 className="text-center display-4 mb-5">الفئات</h2>
          {categories.map((cat, index) => (
            <div className="col-6 col-md-4 col-lg-4 mb-2" key={index}>
              <button
                className="btn border-gray px-4 py-2 fs-5 fw-medium cat w-100"
                onClick={(e) => filterQuery(e)}
                style={{
                  backgroundColor: category === cat ? "#b95151" : "transparent",
                  color: category === cat ? "#fff" : "",
                }}
              >
                {cat}
              </button>
            </div>
          ))}

          {/* <div className="col-6 col-md-4 col-lg-2 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-5 fw-medium text-light border-0 cat">
              كل الفئات
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-5 fw-medium text-light border-0 cat">
              تصميم
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-2">
            <button className="btn btn-secondary px-4 rounded-pill fs-5 fw-medium text-light border-0 cat">
              مواد طبيعية
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-5 fw-medium text-light border-0 cat">
              خرز
            </button>
          </div>

          <div className="col-6 col-md-4 col-lg-2 mb-2">
            <button className="btn btn-secondary px-4 rounded-pill fs-5 fw-medium text-light border-0 cat">
              مواد كيميائية
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-2 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-5 fw-medium text-light border-0 cat">
              خيوط
            </button>
          </div> */}
        </div>
        <div className="w-25">
          <SortComponent products={filterdProducts} setProducts={setProducts} />
        </div>
        <div>
          {error && <h3>{error}</h3>}
          {loading ? (
            <div className="d-flex justify-content-center mt-5">
              <Spinner />
            </div>
          ) : (
            <div>
              <div className="row my-5 g-3 h-100">
                {products &&
                  products?.map((prod: any) => (
                    <div
                      key={prod?.productId}
                      className="col-12 col-sm-6 col-lg-3"
                    >
                      <ProductCard data={prod} />
                    </div>
                  ))}
              </div>
              <div className="container ">
                <div className="row">
                  <Pagination
                    filterdProducts={filterdProducts}
                    setProducts={setProducts}
                    itemOffset={itemOffset}
                    setItemOffset={setItemOffset}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StorePage;
