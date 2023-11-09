import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { productsCol } from "../../../firebase/firebase.config";
import { useUploadFile, useDownloadURL } from "react-firebase-hooks/storage";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc } from "firebase/firestore";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { storage } from "../../../firebase/firebase.config";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { SellerProduct } from "./SellerProduct";
import { sellerProductType } from "../../../types/SellerProduct";
import Select from "react-select";

type Inputs = {
  productTitle: string;
  productPrice: string;
  productDescription: string;
  productCategory: {
    value: string;
    label: string;
  };
  productImage: FileList;
};

type ImageObj = {
  imgId: string;
  imgUrl: string;
};

export const SellerProfileProducts = () => {
  const [productImages, setProductImages] = useState<ImageObj[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      console.log(e?.target.files[0]);

      let productImage = e?.target.files[0];
      await uploadFile(productImageRef, productImage, {
        contentType: productImage.type,
      });
      const imgUrl = await getDownloadURL(productImageRef);
      setProductImages((prev) => [...prev, { imgId, imgUrl }]);
    }
  };
  const deleteImage = (id: string) => {
    deleteObject(ref(storage, `products images/${id}`));
    console.log("img deleted");
    setProductImages((prev) => prev.filter((img) => img.imgId !== id));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addDoc(productsCol, { ...data, productImages });
    console.log(data);
    reset();
    setProductImages([]);
  };

  const handleClose = () => {
    reset();
    reset({ productCategory: {} });
    setProductImages([]);
  };

  const [products, loading, error] = useCollection(productsCol);
  console.log(products);

  const categories = [
    { value: "مواد طبيعية", label: "مواد طبيعية" },
    { value: "مواد كيميائية", label: "مواد كيميائية" },
    { value: "خرز", label: "خرز" },
    { value: "خيوط", label: "خيوط" },
  ];

  return (
    <div className="containr">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        إضافة منتج
      </button>

      {error && <p>{error.message}</p>}
      {loading ? (
        <p>loading ...</p>
      ) : products?.docs && products?.docs.length > 0 ? (
        <div className="row">
          {products?.docs.map((doc) => (
            <SellerProduct
              key={doc.id}
              item={doc.data() as sellerProductType}
              id={doc.id}
            />
          ))}
        </div>
      ) : (
        <p>لا يوجد منتجات</p>
      )}

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-center"
                id="staticBackdropLabel"
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
                  <label htmlFor="productDescription" className="form-label">
                    وصف المنتج
                  </label>
                  <textarea
                    className="form-control "
                    id="productDescription"
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
                <label htmlFor="jj">kkk</label>
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
                  {errors.productImage && (
                    <p className=" text-danger">
                      {errors.productImage.message}
                    </p>
                  )}

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
                    onClick={handleClose}
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
