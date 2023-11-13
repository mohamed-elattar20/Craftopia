import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { productsColRef } from "../../../firebase/firebase.config";
import { useUploadFile } from "react-firebase-hooks/storage";
import { useCollection } from "react-firebase-hooks/firestore";
import { Timestamp, addDoc, query, where } from "firebase/firestore";
import { ChangeEvent, useRef, useState } from "react";
import { storage } from "../../../firebase/firebase.config";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { SellerProductItem } from "./SellerProductItem";
import { ProductType } from "../../../Types/ProductType";
import Select from "react-select";
import { auth } from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./SellerProfileProducts.css";

type Inputs = {
  productTitle: string;
  productPrice: string;
  productDescription: string;
  brand: string;
  discount: string;
  productCategory: {
    value: string;
    label: string;
  };
  productImage: any;
};

type ImageObj = {
  imgId: string;
  imgUrl: string;
};

export const SellerProfileProducts = () => {
  const [productImages, setProductImages] = useState<ImageObj[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [user] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    setValue,
  } = useForm<Inputs>();

  // const chooseImage = () => {
  //   if (fileInputRef.current !== null) {
  //     fileInputRef.current.click();
  //   }
  // };
  const [uploadFile, uploading, , errorUploading] = useUploadFile();
  const imgId = v4();
  const productImageRef = ref(storage, `products images/${imgId}`);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e?.target.files);

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
    deleteObject(ref(storage, `products images/${id}`));
    console.log("img deleted");
    setProductImages((prev) => prev.filter((img) => img.imgId !== id));
    if (productImages.length === 1) {
      setValue("productImage", null);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const productId = v4();
    addDoc(productsColRef, {
      productTitle: data.productTitle,
      productPrice: data.productPrice,
      productDescription: data.productPrice,
      productCategory: {
        value: data.productCategory.value,
        label: data.productCategory.label,
      },
      discount: +data.discount || 0,
      productImages,
      sellerId: user?.uid,
      brand: "",
      productId,
      generatedAt: Timestamp.now(),
      rating: "",
      reviewes: [],
    });
    console.log(data);

    reset();
    reset({ productCategory: {} });
    setProductImages([]);
  };

  const handleClose = () => {
    reset();
    reset({ productCategory: undefined });
    setProductImages([]);
  };

  const sellerProductsColRef =
    user && query(productsColRef, where("sellerId", "==", user?.uid));

  const [products, loading, error] = useCollection(sellerProductsColRef);

  console.log(products);

  const categories = [
    { value: "مواد طبيعية", label: "مواد طبيعية" },
    { value: "مواد كيميائية", label: "مواد كيميائية" },
    { value: "خرز", label: "خرز" },
    { value: "خيوط", label: "خيوط" },
    { value: "تصميم", label: "تصميم" },
    { value: "ملابس", label: "ملابس" },
  ];

  return (
    <div className="containr w-100 overflow-hidden">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop1"
      >
        إضافة منتج
      </button>

      {error && <p>{error.message}</p>}

      {loading ? (
        <p>loading ...</p>
      ) : products?.docs && products?.docs.length > 0 ? (
        <table className="tabel w-100 ">
          <thead>
            <tr className="row border-bottom py-2 align-items-center">
              <th className="col">اسم المنتج</th>
              <th className="col">التصنيف</th>
              <th className="col text-center">السعر</th>
              <th className="col text-center">الصورة</th>
              <th className="col text-center">تعديل</th>
              <th className="col text-center">إزالة</th>
            </tr>
          </thead>
          <tbody>
            {products?.docs.map((doc) => (
              <SellerProductItem
                key={doc.id}
                productItem={doc.data() as ProductType}
                id={doc.id}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>لا يوجد منتجات</p>
      )}

      <div
        className="modal fade"
        id="staticBackdrop1"
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
                    key="add"
                    name="productCategory"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={categories}
                        placeholder="اختر"
                      />
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
                  <label htmlFor="discount" className="form-label">
                    الخصم
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="discount"
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
                  <label
                    className="btn btn-outline-secondary"
                    htmlFor={productImages.length < 4 ? "productImage" : ""}
                  >
                    إضافة صورة
                  </label>
                  <input
                    id="productImage"
                    type="file"
                    hidden
                    accept=".png, .jpg, .jpeg"
                    {...register("productImage", {
                      required: true,
                      validate: {
                        hasValue: (file) => file !== null,
                        // hasValue: (file) => file.length > 0,
                      },
                      onChange: (event) => handleUpload(event),
                    })}
                    // onChange={(event) => handleUpload(event)}
                  />
                  {errors.productImage && (
                    <p className=" text-danger">برجاء إدخال صورة المنتج</p>
                  )}

                  {/* <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={chooseImage}
                    disabled={productImages?.length === 5}
                  >
                    إضافة صورة
                  </button> */}
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
