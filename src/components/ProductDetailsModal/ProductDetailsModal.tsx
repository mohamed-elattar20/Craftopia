// Imgs
import wallet from "../../assets/images/Product Details/wallet.png";
// Components
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faEye } from "@fortawesome/free-solid-svg-icons";
import { DocumentData } from "firebase/firestore";
import { WishListIcon } from "../WishListIcon/WishListIcon";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const ProductDetailsModal = ({ modalData }: DocumentData) => {
  const arr = [1, 2, 3, 4, 5];
  useEffect(() => {}, [modalData]);
  return (
    <>
      <button
        title="show details"
        type="button"
        className="btn bg-black bg-opacity-50 border-0 text-light rounded-pill mt-2"
        data-bs-toggle="modal"
        data-bs-target={`#d${modalData?.productId}`}
      >
        <FontAwesomeIcon icon={faEye} />
      </button>

      <div
        className="modal fade"
        id={`d${modalData?.productId}`}
        aria-labelledby={`exampleModalLabel${modalData?.productId}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {modalData?.productTitle}
              </h1>
              <button
                type="button"
                className="btn-close m-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row text-end">
                <div className="col-sm-12 col-md-12 col-lg-6">
                  <img
                    src={modalData?.productImages[0].imgUrl}
                    alt="img"
                    className="d-block w-100 img-fluid"
                  />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 bg-opacity-25">
                  <h1>{modalData?.productTitle}</h1>
                  {modalData?.ratingCount > 0 ? (
                    <div className="d-flex align-items-center gap-1 mb-2">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          direction: "ltr",
                        }}
                      >
                        <Rating
                          name="half-rating-read"
                          value={modalData?.rating}
                          precision={0.1}
                          readOnly
                        />
                      </Box>
                      <span>({modalData?.ratingCount})</span>
                    </div>
                  ) : (
                    <p>لا يوجد تقييم لهذا المنتج </p>
                  )}

                  {modalData?.discount ? (
                    <div className="d-flex gap-2 align-items-baseline">
                      <h4 className="fs-4">
                        EGP {modalData.priceAfterDiscount.toFixed(2)}
                      </h4>
                      <h4 className="text-decoration-line-through fw-normal fs-6">
                        EGP {modalData?.productPrice}
                      </h4>
                    </div>
                  ) : (
                    <h4 className="fs-4">EGP {modalData?.productPrice}</h4>
                  )}

                  <p>{modalData?.productDescription}</p>
                  <p className="lead">
                    الفئة: <strong> {modalData?.productCategory?.value}</strong>
                  </p>
                  <div className="d-flex">
                    <div className="w-50">
                      <AddToCartBtn product={modalData} />
                    </div>
                    <span className="me-3">
                      <WishListIcon data={modalData} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-secondary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsModal;
