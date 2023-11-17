import ProductCard from "../../components/ProductCard/ProductCard";
import { DocumentData, getDocs, query, where } from "firebase/firestore";
import { productsColRef } from "../../firebase/firebase.config";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { productsCollRef } from "../../firebase/firebase";
import { SortComponent } from "../../components/SortComponent/SortComponent";
// Raect Pagination
import ReactPaginate from "react-paginate";
// CSS
import "./StorePage.css";
import Pagination from "../../components/Pagination/Pagination";
import { Spinner } from "../../components/Spinner/Spinner";
const StorePage = () => {
  // const [products, setProducts] = useState<Array<DocumentData>>([]);
  const [products, setProducts] = useState<any>([]);
  const location = useLocation();
  const [category, setCategory] = useState<string>(location.state);

  // const [itemOffset, setItemOffset] = useState(0);
  const filterQuery = (e: any) => {
    console.log(e);
    if (e.target.tagName === "BUTTON" && e.target.className.includes("cat")) {
      setCategory(e.target.innerText);
      setItemOffset(0);
    }
  };
  const [productss] = useCollectionData(productsCollRef);
  const [loading, setLoading] = useState(true);
  // console.log(productss);
  // **************************************

  const [filterdProducts, setFilterdProducts] = useState<any>([]);

  const [itemOffset, setItemOffset] = useState(0);
  const [pageCoun, setPageCount] = useState(0);
  const itemsPerPage = 5;
  useEffect(() => {
    // ***********************
    setLoading(true);
    const q = query(
      productsColRef,
      category
        ? where("productCategory.value", "==", category)
        : where("productTitle", ">", "")
    );
    const getQuery = async () => {
      const querySnapshot = await getDocs(q)
        .catch((er) => console.log(er))
        .finally(() => setLoading(false));

      const queryProductsArray: Array<DocumentData> = [];
      querySnapshot &&
        querySnapshot.forEach((doc) => {
          console.log(doc);
          queryProductsArray.push(doc.data());
        });
      // console.log(queryProductsArray);
      if (productss && queryProductsArray.length === 0) {
        setFilterdProducts([...(productss as DocumentData[])]);
      } else {
        setFilterdProducts([...(queryProductsArray as any)]);
      }
    };
    setItemOffset(0);
    getQuery();

    // ***********************
  }, [category, productss]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems: any = filterdProducts?.slice(itemOffset, endOffset);

    if (filterdProducts?.length) {
      setPageCount(Math.ceil(filterdProducts?.length / itemsPerPage));
    }
    // const pageCount = Math.ceil(products.length / itemsPerPage);
    setProducts(currentItems && [...currentItems]);
  }, [itemOffset, filterdProducts, pageCoun]);

  // **************************************** Pagination

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    if (filterdProducts?.length) {
      const newOffset =
        (event.selected * itemsPerPage) % filterdProducts?.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    }
  };

  return (
    <>
      <div className="text-center mt-5 bg-primary text-light py-5">
        <h1 className="display-3 fw-medium mb-3">مرحبا بك في المتجر</h1>
        <h5 className="display-6 ">Store</h5>
      </div>
      <div className="container my-5">
        <div
          className="row justify-content-center text-center my-5"
          onClick={(e) => filterQuery(e)}
        >
          <h2 className="text-center display-4 mb-5">الفئات</h2>
          <div className="col-6 col-md-4 col-lg-2 mb-2">
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
          </div>
        </div>
        <div className="w-25">
          <SortComponent products={products} setProducts={setProducts} />
        </div>
        <div>
          {loading ? (
            <div className="d-flex justify-content-center mt-5">
              <Spinner />
            </div>
          ) : (
            <div>
              {" "}
              <div className="row my-5 g-3 h-100">
                {products &&
                  products?.map((prod: any) => (
                    <div
                      key={prod?.productId}
                      className="col-sm-12 col-md-6 col-lg-3"
                    >
                      <ProductCard data={prod} />
                    </div>
                  ))}
              </div>
              <div className="container ">
                <div className="row">
                  {/* <Pagination
            filterdProducts={filterdProducts}
            setProducts={setProducts}
            itemOffset={itemOffset}
            setItemOffset={setItemOffset}
          /> */}
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCoun}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="active"
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
