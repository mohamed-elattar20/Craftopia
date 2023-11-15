import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { db } from "../../../firebase/firebase.config";
import { useUploadFile } from "react-firebase-hooks/storage";
import { doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useRef, useState } from "react";
import { storage } from "../../../firebase/firebase.config";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import Select from "react-select";
import { auth } from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductType } from "../../../Types/ProductType";

type ImageObj = {
  imgId: string;
  imgUrl: string;
};

type Inputs = {
  productTitle: string;
  productPrice: string;
  productDescription: string;
  productCategory: {
    value: string;
    label: string;
  };
  brand: string;
  discount: string;
  productImages: ImageObj[];
};

type SellerProductModalProps = {
  productId: string;
  productItem: Inputs;
};

export const SellerProductModal = ({
  productId,
  productItem,
}: SellerProductModalProps) => {
  const [productImages, setProductImages] = useState<ImageObj[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [user] = useAuthState(auth);

  const chooseImage = () => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };
  const [uploadFile, uploading, , errorUploading] = useUploadFile();
  const imgId = v4();
  const productImageRef = ref(storage, `products images/${imgId}`);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target.files) {
      let productImage = e?.target.files[0];
      await uploadFile(productImageRef, productImage, {
        contentType: productImage.type,
      });
      const imgUrl = await getDownloadURL(productImageRef);
      setProductImages((prev) => [...prev, { imgId, imgUrl }]);
    }
  };

  const deleteImage = (id: string) => {
    const hasObjectWithId = productItem.productImages.some(
      (obj) => obj.imgId === id
    );
    if (!hasObjectWithId) {
      deleteObject(ref(storage, `products images/${id}`));
      console.log("img deleted");
    }
    setProductImages((prev) => prev.filter((obj) => obj.imgId !== id));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<Inputs>({
    defaultValues: productItem,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (productId) {
      const notMatchedImages = productItem.productImages.filter(
        (obj1) =>
          !productImages.some(
            (obj2) => obj1.imgId === obj2.imgId && obj1.imgUrl === obj2.imgUrl
          )
      );

      notMatchedImages.map((obj) => {
        deleteObject(ref(storage, `products images/${obj.imgId}`));
      });

      const docRef = doc(db, "products", productId);

      updateDoc(docRef, {
        ...data,
        productImages,
        sellerId: user?.uid,
        brand: user?.displayName,
      });
    }
    console.log(data);
  };

  const categories = [
    { value: "مواد طبيعية", label: "مواد طبيعية" },
    { value: "مواد كيميائية", label: "مواد كيميائية" },
    { value: "خرز", label: "خرز" },
    { value: "خيوط", label: "خيوط" },
    { value: "ملابس", label: "ملابس" },
  ];

  return (
    <div>
      <div className="text-center">
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faPenToSquare}
          data-bs-toggle="modal"
          data-bs-target={`#a${productId}`}
          onClick={() => setProductImages(productItem.productImages)}
        />
      </div>
      <div
        className="modal fade"
        id={`a${productId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-center"
                id="staticBackdropLabel2"
              >
                بيانات المنتج
              </h1>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column gap-3"
              >
                <div>
                  <label htmlFor="productTitle" className="form-label">
                    اسم المنتج
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productTitle"
                    // defaultValue={productItem.productTitle}
                    {...register("productTitle", {
                      required: "برجاء إدخال اسم المنتج",
                    })}
                  />
                  {errors.productTitle && (
                    <p className=" text-danger">
                      {errors.productTitle.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="productCategory" className="form-label">
                    اختر تصنيف المنتج
                  </label>
                  <Controller
                    key={productId}
                    // defaultValue={productItem.productCategory}
                    name="productCategory"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} options={categories} />
                    )}
                  />
                  {errors.productCategory && (
                    <p className="text-danger ">برجاء اختيار تصنيف المنتج</p>
                  )}
                </div>

                <div>
                  <label htmlFor="productPrice" className="form-label">
                    السعر
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="productPrice"
                    // defaultValue={productItem.productPrice}
                    {...register("productPrice", {
                      required: "برجاء إدخال سعر المنتج",
                      pattern: {
                        value: /\b([1-9]\d{0,4}|100000)\b/,
                        message: "برجاء إدخال رقم صحيح",
                      },
                    })}
                  />
                  {errors.productPrice && (
                    <p className="text-danger">{errors.productPrice.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="discount" className="form-label">
                    الخصم
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="discount"
                    // defaultValue={productItem.discount}
                    {...register("discount", {
                      pattern: {
                        value: /^(?:\d|[1-9]\d|100)$/,
                        message: "برجاء إدخال رقم بين 0 إلى 100",
                      },
                    })}
                  />
                  {errors.discount && (
                    <p className=" text-danger">{errors.discount.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="productDescription" className="form-label">
                    وصف المنتج
                  </label>
                  <textarea
                    className="form-control "
                    id="productDescription"
                    // defaultValue={productItem.productDescription}
                    {...register("productDescription", {
                      required: "برجاء إدخال وصف المنتج",
                    })}
                  ></textarea>
                  {errors.productDescription && (
                    <p className=" text-danger">
                      {errors.productDescription.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    id="jj"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="productImage"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    // {...register("productImage", {
                    //   required: "برجاء إدخال صورة المنتج",
                    // })}
                    onChange={(event) => handleUpload(event)}
                  />
                  {/* {errors.productImage && (
                    <p className=" text-danger">
                      {errors.productImage.message}
                    </p>
                  )} */}

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={chooseImage}
                    disabled={productImages?.length === 5}
                  >
                    إضافة صورة
                  </button>
                </div>
                {errorUploading && (
                  <strong>Error: {errorUploading.message}</strong>
                )}

                {uploading && <span>Uploading file...</span>}
                {productImages?.length > 0 && (
                  <div className=" d-flex gap-3">
                    {productImages.map((img) => (
                      <div key={img.imgId} className="position-relative ">
                        <img
                          className="rounded-2"
                          src={img.imgUrl}
                          alt=""
                          style={{ width: "100px" }}
                        />
                        <button
                          onClick={() => deleteImage(img.imgId)}
                          className="btn btn-danger rounded-circle d-flex justify-content-center align-items-center position-absolute"
                          style={{
                            width: "25px",
                            height: "25px",
                            top: "-12.5px",
                          }}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    data-bs-dismiss={isValid ? "modal" : ""}
                  >
                    حفظ
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    غلق
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
