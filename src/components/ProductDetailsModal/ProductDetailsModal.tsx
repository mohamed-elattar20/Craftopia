// Imgs
import wallet from "../../assets/images/Product Details/wallet.png";
// Components
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faEye } from "@fortawesome/free-solid-svg-icons";
const ProductDetailsModal = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <>
      <button
        title="show details"
        type="button"
        className="btn bg-black bg-opacity-50 border-0 text-light rounded-pill"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <FontAwesomeIcon icon={faEye} />
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                leather wallet- محفظة رجالي جلد طبيعي محفور عليها الإسم
              </h1>
              <button
                type="button"
                className="btn-close m-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row align-items-center text-end">
                <div className="col-sm-12 col-md-12 col-lg-6">
                  <img
                    src={wallet}
                    alt="img"
                    className="d-block w-100 img-fluid"
                  />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 bg-opacity-25">
                  <h1>محفظة رجالي</h1>
                  <p className="lead fw-medium">EGP 900.00</p>
                  <div className="rating-stars mb-2">
                    {arr.map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        className="ms-2 text-warning "
                        icon={faStar}
                      />
                    ))}
                    <span>( 165 )</span>
                  </div>
                  <p>
                    وصف المنتج: محفظة رجالي شيك جلد طبيعي بتقنية الحفر جلد بقري
                    وجلد ماعز
                  </p>
                  <p className="lead">
                    الفئة: <strong>مواد طبيعية</strong>
                  </p>
                  <div>
                    <AddToCartBtn />
                    <button className="bg-primary border-0 rounded-3 p-2 me-3">
                      <FontAwesomeIcon className="text-light" icon={faHeart} />
                    </button>
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
              <button type="button" className="btn btn-primary">
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
