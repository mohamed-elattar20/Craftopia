// Imgs
import bag1 from "../../assets/images/Product Details/bag-1.jpg";
import bag2 from "../../assets/images/Product Details/bag-2.jpg";
import AddToCartBtn from "../../components/AddToCartBtn/AddToCartBtn";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
// CSS
import "./ProductDetails.css";
import { ComponentsProps } from "@mui/material";
import { DocumentData, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { WishListIcon } from "../../components/WishListIcon/WishListIcon";
import ProductDetailsDesc from "./ProductDetailsDesc";
import ProductDetailsReviews from "./ProductDetailsReviews";
import { ProductType } from "../../Types/ProductType";
import AddQuantityToProduct from "../../components/AddQuantityToProduct/AddQuantityToProduct";
import { productsCollRef } from "../../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ProductDetailsPage = () => {
  const location = useLocation();
  const { state } = location;
  const ProductData: ProductType = state && state.data;
  console.log(ProductData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [activeImageUrl, setActiveImageUrl] = useState<string>();
  const relatedProductsQ = query(
    productsCollRef,
    where("productCategory", "==", ProductData.productCategory)
  );
  const [relatedProducts] = useCollectionData(relatedProductsQ);
  console.log(relatedProducts);

  const filteredRelatedProducts = relatedProducts
    ?.filter((pro) => pro.productId !== ProductData.productId)
    .slice(0, 4);
  console.log(filteredRelatedProducts);

  const [flag, setFlag] = useState<Boolean>(false);

  useEffect(() => {
    setActiveImageUrl(ProductData.productImages[0].imgUrl);
  }, [ProductData]);

  return (
    <>
      <div className="container my-5 ">
        <div className="row d-flex g-4 flex-column-reverse flex-md-row">
          <div className="col-12 col-md-6 col-lg-5 col-xl-4 d-flex flex-column gap-3 align-items-start">
            <div style={{ height: "400px" }} className="">
              <img
                className="rounded-3 object-fit-contain"
                src={activeImageUrl}
                alt="product"
                style={{ height: "100%" }}
              />
            </div>
            <div className="d-flex gap-2">
              {ProductData?.productImages.map((img) => (
                <div
                  style={{ cursor: "pointer", width: "40px", height: "40px" }}
                >
                  <img
                    className="rounded-3 h-100"
                    style={{
                      border:
                        img.imgUrl === activeImageUrl
                          ? "1px solid #777"
                          : "none",
                    }}
                    src={img?.imgUrl}
                    alt="product"
                    onClick={(e: React.MouseEvent<HTMLImageElement>) =>
                      setActiveImageUrl(e.currentTarget.src)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <h2 className="fw-normal mb-3 ">{ProductData?.productTitle}</h2>

            {ProductData?.discount ? (
              <div className="d-flex gap-2 align-items-baseline">
                <h3>
                  EGP{" "}
                  {(
                    +ProductData?.productPrice *
                    (1 - +ProductData.discount / 100)
                  ).toFixed(2)}
                </h3>
                <h3 className="text-decoration-line-through fw-normal fs-5">
                  EGP {ProductData?.productPrice}
                </h3>
              </div>
            ) : (
              <h3>EGP {ProductData?.productPrice}</h3>
            )}

            <div className="my-4 d-flex gap-2 align-items-center">
              <div className="w-50">
                <AddToCartBtn product={ProductData} />
              </div>

              <WishListIcon data={ProductData} />
            </div>
            <Link to={`/products/${ProductData?.sellerId}`}>
              <h5>{ProductData?.brand}</h5>
            </Link>
            {/* <a href="">
              <FontAwesomeIcon
                className="text-black ms-3"
                icon={faCircleQuestion}
              /> */}

            <span>سياسة الشحن والاسترجاع</span>
            {/* </a> */}
          </div>
        </div>
        {/* <div className="row g-5 ">
          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="d-flex flex-column gap-3 h-100">
              <div style={{ maxHeight: "80%" }}>
                <img
                  className="rounded-3 "
                  src={activeImageUrl}
                  alt="product"
                  style={{ maxHeight: "100%" }}
                />
              </div>
              <div className="d-flex gap-2">
                {ProductData?.productImages.map((img) => (
                  <div className="" style={{ cursor: "pointer" }}>
                    <img
                      className="rounded-3"
                      style={{
                        border:
                          img.imgUrl === activeImageUrl
                            ? "1px solid #777"
                            : "none",
                      }}
                      src={img?.imgUrl}
                      alt="product"
                      onClick={(e: React.MouseEvent<HTMLImageElement>) =>
                        setActiveImageUrl(e.currentTarget.src)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <h2 className="fw-normal mb-3 ">{ProductData?.productTitle}</h2>
            <h3>EGP {ProductData?.productPrice}</h3>

            <div className="my-4 d-flex gap-2 align-items-center">
              <div className="w-50">
                <AddToCartBtn product={ProductData} />
              </div>

              <WishListIcon data={ProductData} />
            </div>
            <Link to={`/products/${ProductData?.sellerId}`}>
              <h5>{ProductData?.brand}</h5>
            </Link>
          

            <span>سياسة الشحن والاسترجاع</span>
        
          </div>
        </div> */}

        <div className="row">
          <div className="col-12 text-center my-5 d-flex justify-content-center">
            <button
              className={`btn fs-1 ms-5 ${
                !flag ? "text-primary " : "text-muted"
              }`}
              onClick={() => setFlag(false)}
            >
              المواصفات
            </button>
            <button
              className={`btn fs-1 ${!flag ? "text-muted  " : "text-primary"}`}
              onClick={() => setFlag(true)}
            >
              التقييمات
            </button>
          </div>
          {!flag && <ProductDetailsDesc product={ProductData} />}
          {flag && (
            <ProductDetailsReviews product={ProductData as ProductType} />
          )}
        </div>
        <div className="row my-5  g-3">
          <h2 className="mb-4 display-4 text-center ">منتجات ذات صلة</h2>
          {filteredRelatedProducts?.map((prod: any) => (
            <div className="col-12 col-sm-6 col-lg-3" key={prod.productId}>
              <ProductCard data={prod} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
