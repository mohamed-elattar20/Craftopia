import ProductCard from "../../components/ProductCard/ProductCard";
import { DocumentData, getDocs, query, where } from "firebase/firestore";
import { productsColRef } from "../../firebase/firebase.config";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { productsCollRef } from "../../firebase/firebase";
import { SortComponent } from "../../components/SortComponent/SortComponent";

const StorePage = () => {
  const [products, setProducts] = useState<Array<DocumentData>>([]);
  const location = useLocation();
  const [category, setCategory] = useState<string>(location.state);

  const filterQuery = (e: any) => {
    console.log(e);
    if (e.target.tagName === "BUTTON" && e.target.className.includes("cat")) {
      setCategory(e.target.innerText);
      // selectRef.current.clearValue();
    }
  };
  const [productss] = useCollectionData(productsCollRef);
  console.log(productss);

  useEffect(() => {
    const q = query(
      productsColRef,
      category
        ? where("productCategory.value", "==", category)
        : where("productTitle", ">", "")
    );
    const getQuery = async () => {
      const querySnapshot = await getDocs(q);
      const queryProductsArray: Array<DocumentData> = [];
      querySnapshot.forEach((doc) => {
        console.log(doc);

        queryProductsArray.push(doc.data());
      });
      setProducts([...queryProductsArray]);
    };
    getQuery();
  }, [category]);
  // const selectRef = useRef<any>();
  // const sortOptions = [
  //   { value: "low to high", label: "السعر: من الاقل إلى الاعلى" },
  //   { value: "high to low", label: "السعر: من الاعلى إلى الاقل" },
  //   { value: "new to old", label: "وصل حديثا" },
  // ];
  // const handleSorting = (e: SingleValue<{ value: string; label: string }>) => {
  //   if (e?.value === "low to high") {
  //     const sortedProducts = products?.sort(
  //       (a: any, b: any) => +a.productPrice - +b.productPrice
  //     );
  //     setProducts([...sortedProducts]);
  //   }
  //   if (e?.value === "high to low") {
  //     const sortedProducts = products?.sort(
  //       (a: any, b: any) => +b.productPrice - +a.productPrice
  //     );
  //     setProducts([...sortedProducts]);
  //   }
  //   if (e?.value === "new to old") {
  //     const sortedProducts = products?.sort(
  //       (a: any, b: any) => b.generatedAt - a.generatedAt
  //     );
  //     setProducts([...sortedProducts]);
  //   }
  // };

  return (
    <>
      <div className="text-center mt-5 bg-primary text-light py-5">
        <h1 className="display-3 fw-medium mb-3">مرحبا بك في المتجر</h1>
        <h5 className="display-6 ">Store</h5>
      </div>
      <div className="container my-5">
        <div
          className="row justify-content-center text-center"
          onClick={(e) => filterQuery(e)}
        >
          <h2 className="text-center display-5 mb-3">الفئات</h2>
          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-3 text-light border-0 cat">
              أزياء
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-3 text-light border-0 cat">
              تصميم
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 rounded-pill fs-3 text-light border-0 cat">
              مواد طبيعية
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-3 text-light border-0 cat">
              خرز
            </button>
          </div>

          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-3 text-light border-0 cat">
              خيوط
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 rounded-pill fs-3 text-light border-0 cat">
              مواد كيميائية
            </button>
          </div>
        </div>

        <SortComponent products={products} setProducts={setProducts} />
        {/* <Select
          id=""
          ref={selectRef}
          className="basic-single"
          name="color"
          options={sortOptions}
          onChange={(e) => handleSorting(e)}
          
        /> */}
        <div className="row my-5 g-3">
          {products?.map((prod: any) => (
            <div key={prod?.productId} className="col-6 col-md-6 col-lg-3">
              <ProductCard data={prod} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StorePage;
