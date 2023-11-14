import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import UserAddProductForm from "./UserAddProductForm";

export default function Modal() {
  return (
    <div className="pt-5">
      <h2 className="text-center"> تبحث عن منتج ولم تجده ؟</h2>
      <button
        type="button"
        className="btn btn-primary modal-btn d-block w-100-xs w-50-md w-25-lg mx-auto my-3 fw-bold fs-5 py-2"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        شارك ما تريده مع امهر الحرفيين من هنا
        <FontAwesomeIcon icon={faArrowLeft} className="me-2 align-middle" />
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                شارك ما تبحث عنه مع امهر الحرفيين
              </h5>
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div className="modal-body">
              <UserAddProductForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}